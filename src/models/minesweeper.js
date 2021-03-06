import random from './random';

class Mine {

    constructor({ bomb, squares = 0 }) {
        this.bomb = bomb;
        this.squares = squares;
        this.active = false;
        this.flagged = false;
    }

}

function shuffle(array) {
    const result = array;
    let counter = array.length;
    while (counter > 0) {
        const index = random(counter--);
        const temp = result[counter];
        result[counter] = result[index];
        result[index] = temp;
    }
    return result;
}

export default function mineSweeperGrid({ bombs, width, height }, exclude = -1) {
    bombs = parseInt(bombs);
    width = parseInt(width);
    height = parseInt(height);
    const grid = new Array(width * height)
                .fill(new Mine({ bomb: true, squares: -1}), 0, bombs)
                .fill(new Mine({ bomb: false }), bombs);
    return shuffle(grid)
        .map((mine, index, mines) => {
            if(mine.bomb && index === exclude) {
                mine.bomb = false;
                let i;
                do {
                    i = random(mines.length);
                } while(i === index);
                mines[i].bomb = true;
                return new Mine({...mine })
            }
            return mine;
        }).map((mine, index) => {
            mine.position = index;
            if(!mine.bomb) {

                const POSITION = {
                    topleft: index - width - 1,
                    top: index - width,
                    topright: index - width + 1,
                    right: index + 1,
                    bottomright: index + width + 1,
                    bottom: index + width,
                    bottomleft: index + width - 1,
                    left: index - 1
                };
                const filterPosition = (array, position)=> array.filter(([key]) => !key.includes(position));

                const checkBomb = (position)=> {
                    return grid[position] && grid[position].bomb ? 1 : 0;
                }
                
                let numBombs = 0;

                let positionKeyValues = Object.entries(POSITION);
                if(index >= 0 && index < width) {
                    positionKeyValues = filterPosition(positionKeyValues, 'top');
                }
                if(index % width === 0) {
                    positionKeyValues = filterPosition(positionKeyValues, 'left');
                }
                if(index % width === width - 1) {
                    positionKeyValues = filterPosition(positionKeyValues, 'right');
                }
                if(index >= (height * width - width) && index < height * width) {
                    positionKeyValues = filterPosition(positionKeyValues, 'bottom');
                }

                positionKeyValues.forEach(([key, position]) => {
                    numBombs += checkBomb(position);
                });

                mine.squares = numBombs;
            }
            return new Mine({...mine}); // because mine is a reference copy, not a value.
    });
}