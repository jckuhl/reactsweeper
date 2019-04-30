import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
    margin: ${props => {
        switch(props.justify) {
            case 'center':
                return '0 auto';
            case 'left':
                return '0 auto 0 0';
            case 'right':
                return '0 0 0 auto';
            default:
                return '0 0';
        }
    }};
    padding: ${props => props.primary ? '1rem': '0.25rem'};
    text-decoration: ${props => props.primary ? 'underline purple': 'none'};
    font-size: ${props => props.primary ? '2rem': '1rem'};
    width: max-content;
    text-align: center;
    border: 2px solid black;
    display: block;
    font-family: 'Orbitron', sans-serif;
    cursor: pointer;

    &:hover:enabled {
        background: black;
        color: white;
    }

    &:disabled {
        border: 2px solid grey;
        cursor: not-allowed;
    }

    @media (max-width: 1050px) {
        margin: 0 auto;
    }
`;

export default function GameButton(props) {
    return (
        <Btn primary={props.primary}
            justify={props.justify}
            disabled={props.disabled}
            onClick={props.clickAction}>
            {props.children}
        </Btn>
    );
}