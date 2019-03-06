import React, { Component } from 'react';
import styled from 'styled-components';

const ClockDiv = styled.div`
    text-align: center;
`;

export default class Clock extends Component {
    state = {
        start: Date.now(),
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

    componentDidMount() {
        this.timeInterval = setInterval(()=> {
            let time = Math.floor((Date.now() - this.state.start)/1000);
            this.setState({time});
        });
    }

    componentWillUnmount() {
        clearInterval(this.timeInterval);
    }

    render() {
        return (
            <ClockDiv>
                { this.displayTime() }
            </ClockDiv>
        );
    }
}