import React, { Component } from 'react';
import minesweeper from './../models/minesweeper';

export default class Controls extends Component {
    state = {
        bombInput: React.createRef(),
        widthInput: React.createRef(),
        heightInput: React.createRef(),
        disabled: false
    }

    validate(event) {
        const bombs = parseInt(this.state.bombInput.current.value);
        const width = parseInt(this.state.widthInput.current.value);
        const height = parseInt(this.state.heightInput.current.value);
        let invalidBombs = false;
        let invalidWidth = false;
        let invalidHeight = false;

        if(bombs < 1 || bombs > (width * height)) {
            invalidBombs = true;
        }
        if(width < 10 || width > 25) {
            invalidWidth = true;
        }
        if(height < 10 || height > 25) {
            invalidHeight = true;
        }
        this.setState({ disabled: !(!invalidBombs && !invalidWidth && !invalidHeight) });
    }

    startGame(event) {
        event.preventDefault();
        
        const bombs = this.state.bombInput.current.value;
        const width = this.state.widthInput.current.value;
        const height = this.state.heightInput.current.value;
        const mines = minesweeper({ bombs, width, height});
        this.props.addMines(mines);
        this.props.getDimensions({width, height});
        this.props.coolFace();
        this.props.maxFlag(bombs);
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
                        onChange={this.validate.bind(this)}
                    />
                    <label htmlFor="width">Width: </label>
                    <input type="number"
                        name="width"
                        id="width"
                        ref={this.state.widthInput}
                        defaultValue="10"
                        minLength="10"
                        maxLength="25"
                        onChange={this.validate.bind(this)}
                    />
                    <label htmlFor="height">Height: </label>
                    <input type="number" 
                        name="height" 
                        id="height"
                        ref={this.state.heightInput}
                        defaultValue="10"
                        minLength="10"
                        maxLength="25"
                        onChange={this.validate.bind(this)}
                    />
                    {this.state.disabled ? 
                        <small>
                            Bombs cannot exceed length * width, grid can be only as big as 40 (width) * 25 (height)
                        </small> : '' 
                        
                    }
                    <button 
                        onClick={this.startGame.bind(this)} 
                        disabled={this.state.disabled}
                    >New Game</button>
                </form>
            </div>
        );
    }
}