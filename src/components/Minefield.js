import React, { Component } from 'react';
import './../style/minefield.css'
import Mine from './Mine';

export default class Minefield extends Component {
    gridTemplate() {
        const columns = 10;
        return '' + columns;
    }

    render() {
        return (
            <div className="minefield">
                {
                    this.props.mines.map((mine, index) => (
                        <Mine mine={mine} key={index} />
                    ))
                }
            </div>
        );
    }
}