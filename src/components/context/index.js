import React, { Component } from 'react';
import minesweeper from '../../models/minesweeper';

export const MineContext = React.createContext();

export class Provider extends Component {
    state = {
        mines: [],
        bombs: undefined,
        width: 0,
        height: 0,
        face: '🙂',
        currentFlag: 0,
        maxFlag: 0,
        didWin: false,
        winMessagePosition: {
            top: 0,
            left: 0
        },
        winMessageDiv: React.createRef(),
        winMessage: 'You win!',
        clockActive: false,
        clicks: 0
    }

    sadface = () => {
        this.setState({ face: '😢' })
        const mines = this.state.mines.map(mine => {
            mine.active = true;
            return mine;
        });
        this.setState({ mines, didWin: true, winMessage: 'You lose!', clockActive: false });
    }

    setClicks = () => {
        let clicks = this.state.clicks;
        clicks += 1;
        this.setState({ clicks });
    }

    resetMines = (exclude) => {
        const { bombs, width, height } = this.state;
        const mines = minesweeper({ bombs, width, height }, exclude);
        this.setState({ mines }, ()=> {
            this.forceUpdate(()=> {
                this.uncoverMine(exclude);
                if(this.state.mines[exclude].squares === 0) {
                    this.clearBlanks(exclude);
                }
            })
        });
    }

    initialSetup = (mines, maxFlag, dimensions) => {
        this.setState({ 
            mines, 
            didWin: false, 
            maxFlag,
            bombs: maxFlag,
            width: dimensions.width, 
            height: dimensions.height,
            face:  '🙂',
            clicks: 0,
            clockActive: false
            // set clockActive to false and back to true to reset the clock
        }, ()=> this.setState({ clockActive: true }));
    }

    setWinMessagePosition = (top, left) => {
        if(this.state.winMessageDiv) {
            const offset = this.state.winMessageDiv.current.getBoundingClientRect().width / 2;
            this.setState({ winMessagePosition: { top, left: left - offset }});
        }
    }

    setFlag = (value, index, flagged) => {
        this.setState({ currentFlag: value });
        const mines = this.state.mines;
        mines[index].flagged = !flagged;
        this.setState({ mines })
    }

    /**
     * Sets a mine to active
     *
     * @memberof App
     */
    uncoverMine = (index) => {
        const mines = this.state.mines;
        mines[index].active = true;
        this.setState({ mines }, this.checkWin);
    }

    /**
     * Clears all the blanks in a region where the user clicks, as well as all numbers on border
     *
     * @memberof App
     */
    clearBlanks = (clickedIndex) => {
        const { mines, width, height } = this.state;

        const positionFunctions = {
            topleft: index => index - width - 1,
            top: index => index - width,
            topright: index => index - width + 1,
            right: index => index + 1,
            bottomright: index => index + width + 1,
            bottom: index => index + width,
            bottomleft: index => index + width - 1,
            left: index => index - 1
        }

        function detectEdges(positionFns, index) {
            let positions = Object.entries(positionFns);
            if(index >= 0 && index <= width) {
                positions = positions.filter(([k, v]) => !k.includes('top'));
            }
            if(index % width === 0) {
                positions = positions.filter(([k, v])=> !k.includes('left'));
            }
            if((index + 1) % width === 0) {
                positions = positions.filter(([k, v])=> !k.includes('right'));
            }
            if(index >= width * height - width && index < width * height) {
                positions = positions.filter(([k, v])=> !k.includes('bottom'));
            }
            return positions;
        }

        /**
         * Recursive function that calculates which indices on the grid need to be cleared 
         * when a blank is clicked.
         *
         * @param { Array } indicesArray An array of indices that need to be cleared
         * @returns { Array }An array of indices to be cleared or it calls itself to add more indices
         */
        function clear(indicesArray) {
            const numberedSquares = new Set();
            const indicesToBeCleared = [];
            for(let index = 0; index < indicesArray.length; index++) {
                const positionFns = detectEdges(positionFunctions, indicesArray[index]);
                // I need key in order to destructure and grab value, which is the function
                // eslint-disable-next-line
                for(let [key, positionFn] of positionFns) {
                    const position = positionFn(indicesArray[index]);
                    if(mines[position].squares >= 1) {
                        // set numbered squares aside and clear them
                        // without using them to calculate further clears
                        numberedSquares.add(position);
                    } else if(!mines[position].active 
                        && !mines[position].flagged
                        && !mines[position].squares >= 1
                        && !indicesArray.includes(position)
                        && !indicesToBeCleared.includes(position) ) {
                            indicesToBeCleared.push(position);
                        }
                }
            }
            if(indicesToBeCleared.length === 0) {
                return indicesArray.concat(...numberedSquares);
            } else {
                return clear(indicesArray.concat(indicesToBeCleared));
            }
        }
    
        // grab all the indices that need to be cleared
        const indices = clear([clickedIndex]);
        // set them to active and set state
        mines.forEach((mine, index) => {
            if(indices.includes(index)) {
                mine.active = true;
            }
        });
        this.setState({ mines }, this.checkWin);
    }

    checkWin = () => {
        const { mines } = this.state;
        const covered = mines.filter(mine => !mine.active);
        const bombs = mines.filter(mine => mine.bomb);
        if(covered.length === bombs.length) {
            for(let i = 0; i < covered.length; i++) {
                if(covered[i].position !== bombs[i].position) {
                    break;
                }
            }
            this.setState({ didWin: true, winMessage: 'You win!', clockActive: false, face: '😎' });
        }
    }

    render() {
        return (
            <MineContext.Provider value={{
                state: this.state,
                actions: {
                    sadface: this.sadface,
                    initialSetup: this.initialSetup,
                    setWinMessagePosition: this.setWinMessagePosition,
                    setFlag: this.setFlag,
                    uncoverMine: this.uncoverMine,
                    clearBlanks: this.clearBlanks,
                    setClicks: this.setClicks,
                    resetMines: this.resetMines
                }
            }}>
                {this.props.children}
            </MineContext.Provider>
        );
    }
}

export const Consumer = MineContext.Consumer;