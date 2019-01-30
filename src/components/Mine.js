import React, { Component } from 'react';

export default class Mine extends Component {
    render() {
        const bomb = '💣'
        return (
            <div className="mine">
                { this.props.mine.squares === -1 ? bomb : this.props.mine.squares }  
            </div>
        );
    }
}