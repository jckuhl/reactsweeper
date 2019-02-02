import React, { Component } from 'react';
import './../style/display.css'

export default class Display extends Component {

    render() {
        const bombs = this.props.mines.filter((mine)=> mine.bomb === true).length;
        const flags = this.props.flags;
        return (
            <div className="display-container">
                <div className="label">Bombs: </div> 
                <div className="display">{bombs}</div> 
                <div className="face">{this.props.face}</div> 
                <div className="label">Flags: </div>
                <div className="display">{flags}</div>
            </div>
        );
    }
}