import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Home from './views/Home';
import Game from './views/Game';
import Title from './components/Title';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Orbitron');
    margin: 0;
    padding: 0;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    * , *:before, *:after{ 
        box-sizing:border-box; 
        -moz-box-sizing:border-box; 
        -webkit-box-sizing:border-box; 
        -ms-box-sizing:border-box;
    }
`;

export default function App(props) {
    return (
        <React.Fragment>
            <GlobalStyle />
            <Title/>
            <BrowserRouter>
                <React.Fragment>
                    <Route path="/" exact component={Home} />
                    <Route path="/game" component={Game} />
                </React.Fragment>
            </BrowserRouter>
        </React.Fragment>
    );
}