import React, { Component } from 'react';
import Controls from './components/Controls';
import Minefield from './components/Minefield';
import Display from './components/Display';
import './App.css';

class App extends Component {

    state = {
        mines: [],
        bombs: undefined,
        width: 0,
        height: 0,
        face: '😎',
        currentFlag: 0,
        maxFlag: 0
    }

    '🥺'() {
        this.setState({ face: '🥺' })
    }

    '😎'() {
        this.setState({ face: '😎' })
    }

    addMines(mines) {
        mines = mines.map(mine => {
            mine.active = false;
            return mine;
        })
        this.setState({ mines });
    }

    setFlag(value, index, flagged) {
        this.setState({ currentFlag: value });
        const mines = this.state.mines;
        mines[index].flagged = !flagged;
        this.setState({ mines })
    }

    maxFlag(value) {
        this.setState({ maxFlag: value });
    }

    getDimensions(dimensions) {
        this.setState({ width: dimensions.width, height: dimensions.height });
    }

    uncoverMine(index) {
        const mines = this.state.mines;
        mines[index].active = true;
        this.setState({ mines });
    }

    clearBlanks(index) {
        console.log(index);
        const mines = this.state.mines;
        const width = this.state.width;
        const height = this.state.height;
        if(!mines[index]) return;
        if(!mines[index].bomb) {
            mines[index].active = true;
        } else {
            return;
        }
        if(mines[index].squares === 0) {
            const POSITION = {
                topleft: index - width - 1,
                top: index - width,
                topright: index - width + 1,
                right: index + 1,
                bottomright: index + width + 1,
                bottom: index + width,
                bottomleft: index + width - 1,
                left: index - 1
            };

            const filterPosition = (array, pos)=> array.filter(([key]) => !key.includes(pos));

            let positionKeyValues = Object.entries(POSITION);
            if(index >= 0 && index < width) {
                positionKeyValues = filterPosition(positionKeyValues, 'top');
            }
            if(index % width === 0) {
                positionKeyValues = filterPosition(positionKeyValues, 'left');
            }
            if(index % width === width - 1) {
                positionKeyValues = filterPosition(positionKeyValues, 'right');
            }
            if(index >= (height * width - width) && index < height * width) {
                positionKeyValues = filterPosition(positionKeyValues, 'bottom');
            }

            positionKeyValues.forEach(([key, value])=> {
                this.clearBlanks(parseInt(value));
            });
        } else {
            return;
        }
        this.setState({ mines });
    }

    render() {
        const flags = {
            current: this.state.currentFlag,
            max: this.state.maxFlag
        }
        return (
            <div className="App">
                <Controls addMines={this.addMines.bind(this)} 
                    getDimensions={this.getDimensions.bind(this)} 
                    coolFace={this['😎'].bind(this)}
                    maxFlag={this.maxFlag.bind(this)}
                />
                <Display mines={this.state.mines} 
                    face={this.state.face}
                    flags={flags.current}
                />
                <Minefield 
                    mines={this.state.mines} 
                    sadFace={this['🥺'].bind(this)}
                    setFlag={this.setFlag.bind(this)}
                    flags={flags}
                    width={this.state.width}
                    height={this.state.height}
                    clearBlanks={this.clearBlanks.bind(this)}
                    uncoverMine={this.uncoverMine.bind(this)}
                />
            </div>
        );
    }
}

export default App;
