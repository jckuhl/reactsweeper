import React, { useContext } from 'react';
import styled from 'styled-components';
import Controls from '../components/Controls';
import Minefield from '../components/Minefield';
import Display from '../components/Display';
import { MineContext } from '../components/context';

const GameContainer = styled.section`
    display: flex;
    flex-direction: column;
    width: 40%;
    margin: 1rem auto;
    justify-content: center;
`;

const WinMessage = styled.div`
    position: absolute;
    top: ${props => props.position ? props.position.top + 'px' : 0};
    left: ${props => props.position ? props.position.left + 'px' : 0};
    font-size: 3rem;
    text-align: center;
    visibility: ${props => props.visible ? 'visible': 'hidden'};
    text-shadow: ${ props => props.winMessage.includes('win') ? `0px 0px 10px blue;` : `0px 0px 10px red;` };
`;

export default function Game() {
    const { didWin, winMessageDiv, winMessagePosition, winMessage } = useContext(MineContext).state;
    return (
        <GameContainer>
            <Controls />
            <Display />
            <WinMessage position={winMessagePosition} 
                visible={didWin}
                ref={winMessageDiv}
                winMessage={winMessage}>
                {winMessage}
            </WinMessage>
            <Minefield />
        </GameContainer>
    );
}
