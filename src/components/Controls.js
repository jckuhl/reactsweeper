import React, { Component } from 'react';
import minesweeper from './../models/minesweeper';

export default class Controls extends Component {
    state = {
        bombInput: React.createRef(),
        widthInput: React.createRef(),
        heightInput: React.createRef(),
    }

    startGame(event) {
        event.preventDefault();
        
        const bombs = this.state.bombInput.current.value;
        const width = this.state.widthInput.current.value;
        const height = this.state.heightInput.current.value;
        const mines = minesweeper({ bombs, width, height});
        this.props.addMines(mines);
        this.props.getDimensions({width, height});
    }

    render() {
        return (
            <div>
                <form>
                    <label htmlFor="bombs">Bombs: </label>
                    <input type="number" 
                        name="bombs" 
                        id="bombs" 
                        ref={this.state.bombInput} 
                        defaultValue="10"
                        minLength="10"
                        maxLength="100"
                    />
                    <label htmlFor="width">Width: </label>
                    <input type="number"
                        name="width"
                        id="width"
                        ref={this.state.widthInput}
                        defaultValue="10"
                        minLength="10"
                        maxLength="40"
                    />
                    <label htmlFor="length">Height: </label>
                    <input type="number" 
                        name="length" 
                        id="length"
                        ref={this.state.heightInput}
                        defaultValue="10"
                        minLength="10"
                        maxLength="25"
                    />
                    <button onClick={this.startGame.bind(this)}>Start Game</button>
                </form>
            </div>
        );
    }
}