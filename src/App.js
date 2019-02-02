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
        const mines = this.state.mines.map(mine => {
            mine.active = true;
            return mine;
        });
        this.setState({ mines });
    }

    '😎'() {
        this.setState({ face: '😎' })
    }

    addMines(mines) {
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
        this.setState({ 
            width: parseInt(dimensions.width), 
            height: parseInt(dimensions.height)
        });
    }

    uncoverMine(index) {
        const mines = this.state.mines;
        mines[index].active = true;
        this.setState({ mines });
    }

    clearBlanks(index) {
        const { mines, width, height } = this.state;
        const used = new Set();
        let available = [];
        used.add(index);
        const filterPosition = (array, position)=> array.filter(([key]) => !key.includes(position));
        
        mines[index].active = true;
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
