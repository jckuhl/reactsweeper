import React from 'react';
import './../style/minefield.css'
import Mine from './Mine';

function Minefield(props) {
    return (
        <div className="minefield"
            style={{ 
                gridTemplateColumns: `repeat(${props.width}, 1fr)`,
                gridTemplateRows: `repeat(${props.height}, 1fr)`
            }}
        >
            {
                props.mines.map((mine, index) => (
                    <Mine mine={mine} key={index} 
                        sadFace={props.sadFace}
                        addFlag={props.addFlag}
                        flags={props.flags}
                    />
                ))
            }
        </div>
    );
}

export default Minefield;