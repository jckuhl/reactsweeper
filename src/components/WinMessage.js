import styled from 'styled-components';

const WinMessage = styled.div`
    position: absolute;
    top: ${props => props.position ? props.position.top + 'px' : 0};
    left: ${props => props.position ? props.position.left + 'px' : 0};
    font-size: 3rem;
    text-align: center;
    visibility: ${props => props.visible ? 'visible': 'hidden'};
    text-shadow: ${ props => props.winMessage.includes('win') ? `0px 0px 10px blue,

                                                                1px 1px blue,
                                                                -1px -1px blue,
                                                                1px -1px blue,
                                                                -1px 1px blue;`

                                                            : `0px 0px 10px red,
                                                            
                                                                1px 1px red,
                                                                -1px -1px red,
                                                                1px -1px red,
                                                                -1px 1px red;` };
`;

export default WinMessage;