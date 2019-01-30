import React, { Component } from 'react';

export default class Mine extends Component {

    state = {
        uncovered: false
    }

    sweepMine(event) {
        event.preventDefault();
        if (event.type === 'click') {
            this.setState({ uncovered: true });
            if(this.props.mine.bomb) {
                console.log('Boom!');
            } else if(this.props.mine.squares === 0) {
                console.log('Clear!');
            }
        } else if (event.type === 'contextmenu') {
            if(!this.state.uncovered) {
                console.log('Flag')
            }
        }
    }

    render() {
        const bomb = '💣'
        return (
            <div className="mine" onClick={this.sweepMine.bind(this)} onContextMenu={this.sweepMine.bind(this)}>
                { this.props.mine.bomb ? bomb : this.props.mine.squares }  
            </div>
        );
    }
}