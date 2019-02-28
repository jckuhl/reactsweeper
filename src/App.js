import React, { Component } from 'react';
import styled from 'styled-components';
import Controls from './components/Controls';
import Minefield from './components/Minefield';
import Display from './components/Display';

const GameContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
    margin: 1rem auto;
    justify-content: center;
`;

class App extends Component {

    state = {
        mines: [],
        bombs: undefined,
        width: 0,
        height: 0,
        face: '😎',
        currentFlag: 0,
        maxFlag: 0
    }

    sadface = () => {
        this.setState({ face: '🥺' })
        const mines = this.state.mines.map(mine => {
            mine.active = true;
            return mine;
        });
        this.setState({ mines });
    }

    coolface = () => {
        this.setState({ face: '😎' })
    }

    addMines = (mines) => {
        this.setState({ mines });
    }

    setFlag = (value, index, flagged) => {
        this.setState({ currentFlag: value });
        const mines = this.state.mines;
        mines[index].flagged = !flagged;
        this.setState({ mines })
    }

    maxFlag = (value) => {
        this.setState({ maxFlag: value });
    }

    getDimensions = (dimensions) => {
        this.setState({ 
            width: parseInt(dimensions.width), 
            height: parseInt(dimensions.height)
        });
    }

    uncoverMine = (index) => {
        const mines = this.state.mines;
        mines[index].active = true;
        this.setState({ mines });
    }

    clearBlanks = (index) => {
        const { mines, width, height } = this.state;
        const positionFunctions = {
            topleft: index => index - width - 1, //top left
            top: index => index - width,     //top
            topright: index => index - width + 1, //top right
            right: index => index + 1,         //right
            bottomright: index => index + width + 1, //bottom right
            bottom: index => index + width,     //bottom
            bottomleft: index => index + width - 1, //bottom left
            left: index => index - 1          //left
        }

        function clear(index) {
            let positions = Object.entries(positionFunctions);

            // edge detection
            if(index >= 0 && index <= width) {
                positions = positions.filter(([k, v]) => !k.includes('top'));
            }
            if(index % width === 0) {
                positions = positions.filter(([k, v])=> !k.includes('left'));
            }
            if((index + 1) % width === 0) {
                positions = positions.filter(([k, v])=> !k.includes('right'));
            }
            if(index >= width * height - width && index < width * height) {
                positions = positions.filter(([k, v])=> !k.includes('bottom'));
            }

            const indices = positions
                .map(([key, position]) => position(index))
                // .filter(index => index >= 0 && index < width * height)
                .filter(index => !mines[index].active && !mines[index].bomb);
            return indices;
        }
    
        const indices = clear(index);

        mines.forEach((mine, index) => {
            if(indices.includes(index)) {
                mine.active = true;
            }
        });
        this.setState({ mines });
    }

    render() {
        const flags = {
            current: this.state.currentFlag,
            max: this.state.maxFlag
        }
        return (
            <GameContainer>
                <Controls addMines={this.addMines} 
                    getDimensions={this.getDimensions} 
                    coolFace={this.coolface}
                    maxFlag={this.maxFlag}
                />
                <Display mines={this.state.mines} 
                    face={this.state.face}
                    flags={flags.current}
                />
                <Minefield 
                    mines={this.state.mines} 
                    sadFace={this.sadface}
                    setFlag={this.setFlag}
                    flags={flags}
                    width={this.state.width}
                    height={this.state.height}
                    clearBlanks={this.clearBlanks}
                    uncoverMine={this.uncoverMine}
                />
            </GameContainer>
        );
    }
}

export default App;
