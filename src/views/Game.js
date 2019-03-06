import React, { useContext } from 'react';
import styled from 'styled-components';
import Controls from '../components/Controls';
import Minefield from '../components/Minefield';
import Display from '../components/Display';
import Clock from '../components/Clock'
import WinMessage from '../components/WinMessage';
import { MineContext } from '../components/context';

const GameContainer = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 1rem auto;
    justify-content: center;
`;

export default function Game() {
    const { didWin, winMessageDiv, winMessagePosition, winMessage, clockActive } = useContext(MineContext).state;
    return (
        <GameContainer>
            <Controls />
            <Display />
            { clockActive ? <Clock /> : null}
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
