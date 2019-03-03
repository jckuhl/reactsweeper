import React from 'react';
import styled from 'styled-components';
import Mine from './Mine';

const MineGrid = styled.div`
    display: grid;
    width: auto;
    margin: 0 auto;
    grid-template-columns: ${props => `repeat(${props.width}, 1fr)`};
    grid-template-rows: ${props => `repeat(${props.height}, 1fr)`};
`;

function Minefield(props) {
    return (
        <MineGrid width={props.width} height={props.height}>
            {
                props.mines.map((mine, index) => (
                    <Mine mine={mine} key={index} position={index}
                        sadFace={props.sadFace}
                        setFlag={props.setFlag}
                        flags={props.flags}
                        clearBlanks={props.clearBlanks}
                        uncoverMine={props.uncoverMine}
                        didWin={props.didWin}
                    />
                ))
            }
        </MineGrid>
    );
}

export default Minefield;