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
                    this.setState({ flagged: true });
                    this.props.setFlag(current + 1);
                }
            } else if(!this.state.uncovered && this.state.flagged) {
                this.setState({ flagged: false });
                this.props.setFlag(current - 1);
            }
        }
    }

    getColor() {
        if(this.props.mine.squares === -1 || this.props.mine.squares === 0) {
            return;
        } else {
            const colors = [
                'violet',
                'indigo',
                'blue',
                'green',
                'yellow',
                'orange',
                'red',
                'maroon'
            ]
            return colors[this.props.mine.squares - 1]
        }
    }

    squareValue() {
        if(this.state.uncovered) {
            return this.props.mine.bomb ? '💣' 
                    : this.props.mine.squares === 0 ? '' 
                    : this.props.mine.squares;
        } else {
            return this.state.flagged ? '❓' : '';
        }
    }

    render() {
        const textColor = this.getColor();
        return (
            <div className={`mine + ${this.state.uncovered ? '' : 'covered'}`} 
                onClick={this.sweepMine.bind(this)} 
                onContextMenu={this.sweepMine.bind(this)}
                style={{
                    color: textColor
                }}>
                { this.squareValue() }  
            </div>
        );
    }
}