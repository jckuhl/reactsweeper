import React, { Component } from 'react';

const MineContext = React.createContext();

export class Provider extends Component {
    render() {
        return (
            <MineContext.Provider>
                {this.props.children}
            </MineContext.Provider>
        );
    }
}

