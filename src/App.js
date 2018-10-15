import React, { Component } from 'react';
import MineSweeper from './components/component.minesweeper';
import MineSweeperOptions from './components/component.minesweeperopts';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <MineSweeper/>
        <MineSweeperOptions/>
      </div>
    );
  }
}

export default App;
