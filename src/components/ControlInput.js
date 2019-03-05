import React from 'react';
import styled from 'styled-components';

const ControlDiv = styled.div`
    input {
        width: 3rem;
        font-family: 'ZCOOL QingKe HuangYou', cursive;
        font-size: 1rem;
        border: 2px solid black;
        margin: 5px;
    }
`;

const ControlInput = React.forwardRef((props, ref)=> {
    return (
        <ControlDiv>
            <label htmlFor={props.id}>{props.children}</label>
            <input type="number"
                id={props.id}
                ref={ref}
                defaultValue={props.default}
                minLength={props.min}
                maxLength={props.max}
                onInput={props.inputAction}
                />
        </ControlDiv>
    );
});

export default ControlInput;