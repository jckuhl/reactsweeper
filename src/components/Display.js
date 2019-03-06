import React, { useContext } from 'react';
import styled from 'styled-components';
import { MineContext } from './context';

const DisplayContainer = styled.div`
    display: flex;
    /* grid-template-columns: 100px 4rem 50px 100px 4rem; */
    text-align: right;
    background: darkgray;
    align-items: center;
    justify-content: space-between;
    height: 30px;
`;

const DisplayScore = styled.span`
    font-family: 'Segment7Standard', monospace;
    background: black;
    color: red;
    width: 4rem;
    border: 2px solid darkgray;
`;

const DisplayLabel = styled.span`
    display: flex;
    margin: ${ props => {
        switch(props.justify) {
            case 'left':
                return '0 0 0 1rem';
            case 'right':
                return '0 1rem 0 0';
            default:
                return '0 0';
        }
    }};
`;

const DisplayFace = styled.span`
    font-family: monospace;
    font-size: 25px;
    padding-bottom: 5px;
    border: 2px solid black;
    text-align: center;
    width: 30px;
    height: 30px;
`;

export default function Display(props) {
    const { mines, face, currentFlag } = useContext(MineContext).state;
    const bombs = mines.filter((mine)=> mine.bomb === true).length;
    return (
        <DisplayContainer>
            <DisplayLabel justify={'left'}>
                <div>Bombs: </div> 
                <DisplayScore>{bombs}</DisplayScore> 
            </DisplayLabel>
            <DisplayFace>{face.trim()}</DisplayFace> 
            <DisplayLabel justify={'right'}>
                <div>Flags: </div>
                <DisplayScore>{currentFlag}</DisplayScore>
            </DisplayLabel>
        </DisplayContainer>
    );
}