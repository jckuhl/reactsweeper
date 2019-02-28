import React, { Component } from 'react';
import styled from 'styled-components';
import Controls from '../components/Controls';
import Minefield from '../components/Minefield';
import Display from '../components/Display';

const GameContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
    margin: 1rem auto;
    justify-content: center;
`;

export default class Game extends Component {

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

    /**
     * Set the dimensions of the mine field
     *
     * @memberof App
     */
    setDimensions = (dimensions) => {
        this.setState({ 
            width: parseInt(dimensions.width), 
            height: parseInt(dimensions.height)
        });
    }

    /**
     * Sets a mine to active
     *
     * @memberof App
     */
    uncoverMine = (index) => {
        const mines = this.state.mines;
        mines[index].active = true;
        this.setState({ mines });
    }

    /**
     * Clears all the blanks in a region where the user clicks, as well as all numbers on border
     *
     * @memberof App
     */
    clearBlanks = (index) => {
        const { mines, width, height } = this.state;
        const positionFunctions = {
            topleft: index => index - width - 1,
            top: index => index - width,
            topright: index => index - width + 1,
            right: index => index + 1,
            bottomright: index => index + width + 1,
            bottom: index => index + width,
            bottomleft: index => index + width - 1,
            left: index => index - 1
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
                .filter(index => !mines[index].active && !mines[index].bomb);
            return indices;
        }
    
        // grab all the indices that need to be cleared
        const indices = clear(index);

        // set them to active and set state
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
                    setDimensions={this.setDimensions} 
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
