import React, { Component } from 'react';

// 🔥💥

export default class Mine extends Component {

    sweepMine(event) {
        event.preventDefault();
        const { mine, position, uncoverMine, sadFace, setFlag } = this.props;
        // if clicked on and unflagged, explode, reveal blanks, or reveal number
        if (event.type === 'click' && !mine.flagged) {
            uncoverMine(position);
            if(mine.bomb) {
                sadFace();
            } else if(mine.squares === 0) {
                this.props.clearBlanks(this.props.position);
            } else {
                console.log('Reveal number')
            }
        } else if (event.type === 'contextmenu') {
            const { current, max } = this.props.flags;
            // if uncovered but not flagged, add a flag.
            if(!mine.active && !mine.flagged) {
                if(current !== max) {
                    setFlag(current + 1, position, mine.flagged);
                }
            } else if(!mine.active && mine.flagged) {
                setFlag(current - 1, position, mine.flagged);
            }
        }
    }

    getColor() {
        const { mine } = this.props;
        if(mine.squares === -1 || mine.squares === 0) {
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
            return colors[mine.squares - 1]
        }
    }

    squareValue() {
        const { mine } = this.props;
        if(mine.active) {
            return mine.bomb ? '💣' 
                    : mine.squares === 0 ? '' 
                    : mine.squares;
        } else {
            return mine.flagged ? '❓' : '';
        }
    }

    render() {
        const textColor = this.getColor();
        return (
            <div className={`mine ${this.props.mine.active ? '' : 'covered'}`} 
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