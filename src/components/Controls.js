import React, { useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import minesweeper from './../models/minesweeper';
import { MineContext } from './context';
import ControlInput from './ControlInput';
import GameButton from './Button';

const ControlForm = styled.form`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

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
        <ControlForm>
            <ControlInput id={'bombs'}
                max={100}
                min={10}
                ref={bombInput}
                default={10}
                inputAction={validate}>
                Bombs: 
            </ControlInput>
            <ControlInput id={'width'}
                max={25}
                min={10}
                ref={widthInput}
                default={10}
                inputAction={validate}>
                Width: 
            </ControlInput>
            <ControlInput id={'height'}
                max={25}
                min={10}
                ref={heightInput}
                default={10}
                inputAction={validate}>
                Height: 
            </ControlInput>
            <GameButton
                clickAction={startGame}
                justify={'right'}
                disabled={disabled}
                >New Game</GameButton>
            {disabled ? 
                <small>
                    Bombs cannot exceed length * width, grid can be only as big as 40 (width) * 25 (height)
                </small> : null 
            }
        </ControlForm>
    );
}