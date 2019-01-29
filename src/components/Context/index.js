import React, { Component } from 'react';

const MineSweeperContext = React.createContext();
export const MineSweeperConsumer = MineSweeperContext.Consumer;

export class MineSweeperProvider extends Component {
    state = {
        mines: []
    }

    addMines(mines) {
        this.setState({ mines });
    }

    render() {
        return (
            <MineSweeperContext.Provider value={{
                mines: this.state.mines,
                actions: {
                    addMines: this.addMines.bind(this)
                }
            }}>
               {this.props.children} 
            </MineSweeperContext.Provider>
        );
    }
}