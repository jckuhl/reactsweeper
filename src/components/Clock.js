import React, { Component } from 'react';
import styled from 'styled-components';

const ClockDiv = styled.div`
    text-align: center;
`;

export default class Clock extends Component {
    state = {
        start: 0,
        time: 0
    }

    displayTime = ()=> {
        let seconds = this.state.time;
        let minutes = 0;
        if(seconds > 59) {
            minutes = Math.floor(seconds/60);
            seconds = seconds - 60 * minutes;
        }
        return `${minutes < 10 ? '0' + minutes: minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }

    componentDidUpdate(prevProps) {
        if(this.props.active) {
            if(this.state.start === 0) {
                this.setState({ start: Date.now() })
            }
            if(this.timeInterval === undefined) {
                this.timeInterval = setInterval(()=> {
                    let time = Math.floor((Date.now() - this.state.start)/1000);
                    this.setState({time});
                });
            }
        } else if(prevProps.active !== this.props.active) {
            clearInterval(this.timeInterval);
            this.timeInterval = undefined;
            this.setState({ start: 0 })
        }
    }

    render() {
        return (
            <ClockDiv>
                { this.displayTime() }
            </ClockDiv>
        );
    }
}