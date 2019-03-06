import React, { useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Mine from './Mine';
import { MineContext } from './context';

const MineGrid = styled.div`
    display: grid;
    width: auto;
    margin: 0 auto;
    grid-template-columns: ${props => `repeat(${props.gridwidth}, 1fr);`};
    grid-template-rows: ${props => `repeat(${props.gridheight}, 1fr);`};
`;

export default function Minefield() {
    const minefieldDiv = useRef(null);
    const context = useContext(MineContext);

    useEffect(()=> {
        const { top, left } = minefieldDiv.current.getBoundingClientRect();
        context.actions.setWinMessagePosition(top, left);
    }, []);

    const { mines, width, height } = context.state;

    return (
        <MineGrid gridwidth={width} gridheight={height} ref={minefieldDiv}>
            {
                mines.map((mine, index) => (
                    <Mine mine={mine} key={index} position={index}/>
                ))
            }
        </MineGrid>
    );
}