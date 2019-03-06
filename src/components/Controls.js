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
    width: 40%;
    margin: 0 auto;
`;

export default function Controls() {
    const [ MINBOMB, MAXBOMB, MINWIDTH, MAXWIDTH, MINHEIGHT, MAXHEIGHT ] = [1, 100, 10, 40, 10, 25];
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

        if(bombs < MINBOMB || bombs > (width * height)) {
            invalidBombs = true;
        }
        if(width < MINWIDTH || width > MAXWIDTH) {
            invalidWidth = true;
        }
        if(height < MINHEIGHT || height > MAXHEIGHT) {
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
                max={MAXBOMB}
                min={MINBOMB}
                ref={bombInput}
                default={10}
                inputAction={validate}>
                Bombs: 
            </ControlInput>
            <ControlInput id={'width'}
                max={MAXWIDTH}
                min={MINWIDTH}
                ref={widthInput}
                default={10}
                inputAction={validate}>
                Width: 
            </ControlInput>
            <ControlInput id={'height'}
                max={MAXHEIGHT}
                min={MINHEIGHT}
                ref={heightInput}
                default={10}
                inputAction={validate}>
                Height: 
            </ControlInput>
            <GameButton
                clickAction={startGame}
                justify={'right'}
                disabled={disabled}>
                New Game
            </GameButton>
            {disabled ? 
                <small>
                    Bombs cannot exceed length * width, grid can be only as big as {MAXWIDTH} (width) * {MAXHEIGHT} (height)
                </small> : null 
            }
        </ControlForm>
    );
}