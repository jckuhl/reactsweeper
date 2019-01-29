class Mine {

    constructor({ bomb, squares = 0 }) {
        this.bomb = bomb;
        this.squares = squares;
        this.active = false;
    }

}

function shuffle(array) {
    const random = (len) => Math.floor(Math.random() * len);
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

export default function mineSweeperGrid({ bombs, width, length }) {
    const grid = new Array(width * length)
                .fill(new Mine({ bomb: true, squares: -1}), 0, bombs)
                .fill(new Mine({ bomb: false }), bombs);
    return shuffle(grid).map((mine, index) => {
        if(!mine.bomb) {

            const POSITION = [
                index - width - 1,  // TOP LEFT
                index - width,      // TOP MID
                index - width + 1,  // TOP RIGHT
                index + 1,          // RIGHT
                index + width + 1,  // BOTTOM RIGHT
                index + width,      // BOTTOM MID
                index + width - 1,  // BOTTOM LEFT
                index - 1           // LEFT
            ];

            const checkBomb = (position)=> {
                return grid[position] && grid[position].bomb ? 1 : 0;
            }
            
            let numBombs = 0;

            POSITION.forEach(position => {
                numBombs += checkBomb(position);
            });

            mine.squares = numBombs;
        }
        return new Mine({...mine}); // because mine is a reference copy, not a value.
    });
}