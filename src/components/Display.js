import React, { useContext } from 'react';
import styled from 'styled-components';
import { MineContext } from './context';

const DisplayContainer = styled.div`
    display: grid;
    grid-template-columns: 100px 50px 50px 100px 50px;
    text-align: center;
    background: darkgray;
    align-items: baseline;
    justify-content: center;
    height: 30px;
`;

const DisplayScore = styled.div`
    font-family: 'Segment7Standard', monospace;
    width: auto;
    background: black;
    color: red;
    border: 2px solid darkgray;
`;

const DisplayLabel = styled.div`
`;

const DisplayFace = styled.div`
    border: 2px solid black;
    width: 30px;
    height: 30px;
`;

export default function Display(props) {
    const context = useContext(MineContext);
    const { mines, face, currentFlag } = context.state;
    const bombs = mines.filter((mine)=> mine.bomb === true).length;
    return (
        <DisplayContainer>
            <DisplayLabel>Bombs: </DisplayLabel> 
            <DisplayScore>{bombs}</DisplayScore> 
            <DisplayFace>{face}</DisplayFace> 
            <DisplayLabel>Flags: </DisplayLabel>
            <DisplayScore>{currentFlag}</DisplayScore>
        </DisplayContainer>
    );
}