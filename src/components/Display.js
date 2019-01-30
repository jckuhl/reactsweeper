import React, { Component } from 'react';

export default class Display extends Component {
    render() {
        const bombs = this.props.mines.filter((mine)=> mine.bomb === true).length;
        return (
            <div>
                <p>Bombs: {bombs}</p>
            </div>
        );
    }
}