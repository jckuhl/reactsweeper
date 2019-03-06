import React from 'react';
import styled from 'styled-components';

const Footer = styled.footer`
    /* position: fixed;
    left: 0;
    bottom: 0px; */
    flex-shrink: 0;
    width: 100%;
    padding: 1rem;
    text-align: center;
    height: 60px;
`;

const Phantom = styled.div`
    display: block;
    height: 60px;
    width: 100%;
`;

export default function Copy() {
    return (
        <Footer>
            <span>&copy; Jonathan Kuhl 2019 </span>
            <a href="https://github.com/jckuhl/reactsweeper" target="_blank" rel="noopener noreferrer">Github</a>
        </Footer>
    );
}