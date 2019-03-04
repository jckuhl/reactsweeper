import React, { useState, useRef, useContext } from 'react';
import minesweeper from './../models/minesweeper';
import { MineContext } from './context';

export default function Controls() {
    const bombInput = useRef(null);
    const widthInput = useRef(null);
    const heightInput = useRef(null);
    const [disabled, setDisabled] = useState(false);

    const context = useContext(MineContext);

    const validate = event => {
        const bombs = parseInt(bombInput.current.value);
        const width = parseInt(widthInput.current.value);
        const height = parseInt(heightInput.current.value);
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
        setDisabled(!(!invalidBombs && !invalidWidth && !invalidHeight));
    }

    const startGame = event => {
        event.preventDefault();
        
        const bombs = bombInput.current.value;
        const width = parseInt(widthInput.current.value);
        const height = parseInt(heightInput.current.value);
        const mines = minesweeper({ bombs, width, height});
        context.actions.initialSetup(mines, bombs, {width, height});
    }

    return (
        <form>
            <label htmlFor="bombs">Bombs: </label>
            <input type="number" 
                name="bombs" 
                id="bombs" 
                ref={bombInput} 
                defaultValue="10"
                minLength="10"
                maxLength="100"
                onInput={validate}
                />
            <label htmlFor="width">Width: </label>
            <input type="number"
                name="width"
                id="width"
                ref={widthInput}
                defaultValue="10"
                minLength="10"
                maxLength="25"
                onInput={validate}
                />
            <label htmlFor="height">Height: </label>
            <input type="number" 
                name="height" 
                id="height"
                ref={heightInput}
                defaultValue="10"
                minLength="10"
                maxLength="25"
                onInput={validate}
                />
            {disabled ? 
                <small>
                    Bombs cannot exceed length * width, grid can be only as big as 40 (width) * 25 (height)
                </small> : null 
                
            }
            <button 
                onClick={startGame} 
                disabled={disabled}
                >New Game</button>
        </form>
    );
}