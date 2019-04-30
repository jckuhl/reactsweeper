import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import GameButton from './../components/Button';

const Introduction = styled.section`
    @import url('https://fonts.googleapis.com/css?family=Roboto');
    font-family: 'Roboto', sans-serif;
    text-align: justify;
    margin: 0 auto;
    width: 80%;

    @media (min-width: 800px) {
        width: 50%
    }
`;

export default function Home(props) {
    return (
        <Introduction>
            <p>Welcome to React Sweeper!</p>
            <p>React Sweeper is your basic Minesweeper game, built with the React.js library.  The game is easy to play but difficult to win.  You are presented with a grid of squares.  Under each square there might be a mine.  Click on the mine?  Game over.  However, if you don't click on the mine, you'll start clearing the field.  If you uncover a number, that number tells you how many mines touch that particular square.  You may also right click a square to mark it with a flag.  This will keep you from clicking that square by mistake.  The game ends when all the tiles are revealed except for the mines, or a mine is clicked on.</p>
            <Link to="/game">
                <GameButton primary justify={'center'}>
                Play
                </GameButton>
            </Link>
        </Introduction>
    );
}