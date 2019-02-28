import React from 'react';
import styled from 'styled-components';

const Heading = styled.header`
    text-align: center;
    font-family: 'Orbitron', sans-serif;
`;

export default function Title(props) {
    return (
        <Heading>
            <h1>React Sweeper</h1>
            <h3>A Minesweeper style game built in React!</h3>
        </Heading>
    );
}