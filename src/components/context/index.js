import React, { Component } from 'react';

export const MineContext = React.createContext();

export class Provider extends Component {
    state = {
        mines: [],
        bombs: undefined,
        width: 0,
        height: 0,
        face: '😎',
        currentFlag: 0,
        maxFlag: 0,
        didWin: false,
        winMessagePosition: {
            top: 0,
            left: 0
        },
        winMessageDiv: React.createRef(),
        winMessage: 'You win!'
    }

    sadface = () => {
        this.setState({ face: '🥺' })
        const mines = this.state.mines.map(mine => {
            mine.active = true;
            return mine;
        });
        this.setState({ mines, didWin: true, winMessage: 'You lose!' });
    }

    initialSetup = (mines, maxFlag, dimensions) => {
        this.setState({ 
            mines, 
            didWin: false, 
            maxFlag, 
            width: dimensions.width, 
            height: dimensions.height,
            face:  '😎'
        });
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
    clearBlanks = (index) => {
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

        function detectEdges(positionFns) {
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

        function clear(index) {
            const indices = detectEdges(positionFunctions)
                .map(([key, position]) => position(index))
                .filter(index => !mines[index].active 
                                && !mines[index].bomb
                                && !mines[index].flagged
                                // && !usedIndex.has(index)
                );
            return indices;
        }
    
        // grab all the indices that need to be cleared
        const indices = clear(index);

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
            this.setState({ didWin: true, winMessage: 'You win!' });
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
                    clearBlanks: this.clearBlanks
                }
            }}>
                {this.props.children}
            </MineContext.Provider>
        );
    }
}

export const Consumer = MineContext.Consumer;