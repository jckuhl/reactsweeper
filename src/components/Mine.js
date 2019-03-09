import React, { useContext } from 'react';
import styled from 'styled-components';
import { MineContext } from './context';

// 🔥💥

const MineSquare = styled.div`
    text-align: center;
    align-self: center;
    width: 25px;
    height: 25px;
    box-shadow: 0 0 0 1px black;
    font-size: 1.25rem;
    color: ${props => props.color};
    background: ${props => props.active ? 'white' : 'grey'};
    border-top: ${props => props.active ? 'solid 1px black;' : 'solid 2px white;'};
    border-left: ${props => props.active ? 'solid 1px black;' : 'solid 2px white;'};
    border-bottom: ${props => props.active ? 'solid 1px black;' : 'solid 2px darkgray;'};
    border-right: ${props => props.active ? 'solid 1px black;' : 'solid 2px darkgray;'};
`;

export default function Mine({ mine, position }) {

    const context = useContext(MineContext);

    function sweepMine(event) {
        event.preventDefault();
        const { didWin, currentFlag, maxFlag, clicks } = context.state;
        const { uncoverMine, sadface, setFlag, clearBlanks, setClicks, resetMines } = context.actions;

        // no events if game is won
        if(didWin) return;

        setClicks();

        // if clicked on and unflagged, explode, reveal blanks, or reveal number
        if (event.type === 'click' && !mine.flagged) {
            // avoid a bomb on a first click
            console.log(clicks);
            if(mine.bomb && clicks === 0) {
                resetMines(position);
                return;
            }
            uncoverMine(position);
            if(mine.bomb) {
                sadface();
            } else if(mine.squares === 0) {
                clearBlanks(position);
            }
        } else if (event.type === 'contextmenu') {
            // if uncovered but not flagged, add a flag.
            if(!mine.active && !mine.flagged) {
                if(currentFlag !== maxFlag) {
                    setFlag(currentFlag + 1, position, mine.flagged);
                }
            } else if(!mine.active && mine.flagged) {
                setFlag(currentFlag - 1, position, mine.flagged);
            }
        }
    }

    function getColor() {
        if(mine.squares === -1 || mine.squares === 0) {
            return;
        } else {
            const colors = [
                'violet',
                'indigo',
                'blue',
                'darkgreen',
                'green',
                'orange',
                'red',
                'maroon'
            ]
            return colors[mine.squares - 1]
        }
    }

    function squareValue() {
        if(mine.active) {
            return mine.bomb ? '💣' 
                    : mine.squares === 0 ? '' 
                    : mine.squares;
        } else {
            return mine.flagged ? '❓' : '';
        }
    }
    
    const textColor = getColor();
    return (
        <MineSquare
            onClick={sweepMine} 
            onContextMenu={sweepMine}
            active={mine.active}
            color={textColor}>
            { squareValue() }  
        </MineSquare>
    );

}