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
        height: 0
    }

    addMines(mines) {
        this.setState({ mines });
    }

    getDimensions(dimensions) {
        this.setState({ width: dimensions.width, height: dimensions.height });
    }

    render() {
        return (
            <div className="App">
                <Controls addMines={this.addMines.bind(this)} getDimensions={this.getDimensions.bind(this)}/>
                <div className="display">
                    <Display mines={this.state.mines}/>
                    <Minefield mines={this.state.mines} />
                </div>
            </div>
        );
    }
}

export default App;
