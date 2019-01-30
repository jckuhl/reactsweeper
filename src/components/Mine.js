import React, { Component } from 'react';

// 🔥💥

export default class Mine extends Component {

    state = {
        uncovered: false,
        flagged: false
    }

    sweepMine(event) {
        event.preventDefault();
        // if clicked on and unflagged, explode, reveal blanks, or reveal number
        if (event.type === 'click' && !this.state.flagged) {
            this.setState({ uncovered: true });
            if(this.props.mine.bomb) {
                console.log('Boom! 🔥');
                this.props.sadFace();
            } else if(this.props.mine.squares === 0) {
                console.log('Clear!');
            } else {
                console.log('Reveal number')
            }
        } else if (event.type === 'contextmenu') {
            const { current, max } = this.props.flags;
            // if uncovered but not flagged, add a flag.
            if(!this.state.uncovered && !this.state.flagged) {
                if(current !== max) {
                    console.log('Flag')
                    this.setState({ flagged: true });
                    this.props.addFlag(current + 1);
                }
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