import React, { Component } from 'react';

export default class Display extends Component {

    render() {
        const bombs = this.props.mines.filter((mine)=> mine.bomb === true).length;
        const flags = this.props.flags;
        return (
            <div>
                <p>Bombs: {bombs} {this.props.face} Flags: {flags}</p>
            </div>
        );
    }
}