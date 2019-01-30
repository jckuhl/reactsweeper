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

    coolFace() {
        this.setState({ face: '😎' })
    }

    addMines(mines) {
        this.setState({ mines });
    }

    addFlag(value) {
        this.setState({ currentFlag: value });
    }

    maxFlag(value) {
        this.setState({ maxFlag: value });
    }

    getDimensions(dimensions) {
        this.setState({ width: dimensions.width, height: dimensions.height });
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
                    coolFace={this.coolFace.bind(this)}
                    maxFlag={this.maxFlag.bind(this)}
                />
                <Display mines={this.state.mines} 
                    face={this.state.face}
                    flags={flags.current}
                />
                <Minefield 
                    mines={this.state.mines} 
                    sadFace={this['🥺'].bind(this)}
                    addFlag={this.addFlag.bind(this)}
                    flags={flags}
                    width={this.state.width}
                    height={this.state.height}
                />
            </div>
        );
    }
}

export default App;
