import React from 'react';
import styled from 'styled-components';

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

export default function Mine(props) {

    function sweepMine(event) {
        event.preventDefault();
        const { mine, position, uncoverMine, sadFace, setFlag, didWin } = props;
        if(didWin) return;
        // if clicked on and unflagged, explode, reveal blanks, or reveal number
        if (event.type === 'click' && !mine.flagged) {
            uncoverMine(position);
            if(mine.bomb) {
                sadFace();
            } else if(mine.squares === 0) {
                props.clearBlanks(props.position);
            } else {
                // console.log('Reveal number')
                // TODO: Do I need this else?
            }
        } else if (event.type === 'contextmenu') {
            const { current, max } = props.flags;
            // if uncovered but not flagged, add a flag.
            if(!mine.active && !mine.flagged) {
                if(current !== max) {
                    setFlag(current + 1, position, mine.flagged);
                }
            } else if(!mine.active && mine.flagged) {
                setFlag(current - 1, position, mine.flagged);
            }
        }
    }

    function getColor() {
        const { mine } = props;
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
        const { mine } = props;
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
                active={props.mine.active}
                color={textColor}>
                { squareValue() }  
            </MineSquare>
    );

}