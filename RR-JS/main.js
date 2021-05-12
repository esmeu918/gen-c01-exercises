const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

let currentlyPlaying = true;

class Field {
    constructor(field) {
        this._field = field;
        this.y = 0;
        this.x = 0;
    }

    get field() {
        return this._field;
    }

    //two-dimensional plane
    print() {
        return this.field.map(row =>
            row.join('')
        ).join('\n');
    }

    ask() {
        let move = prompt('Which direction do you want to move to? (w for Up, s for down, a for left and d for right)');
        switch (move.toLowerCase()) {
            case 'w':
                console.log('Moving up');
                this.y -= 1;
                break;
            case 's':
                console.log('Moving down');
                this.y += 1;
                break;
            case 'a':
                console.log('Moving left');
                this.x -= 1;
                break;
            case 'd':
                console.log('Moving right');
                this.x += 1;
                break;
            default:
                break;
        }
    }


    checkWin() {

        if (this.field[this.y] == undefined) {
            console.log('You lose - Out of boundary');
            return currentlyPlaying = false;
        }
        //
        switch (this.field[this.y][this.x]) {
            case hole:
                console.log('Oh no, you fell in a hole!');
                currentlyPlaying = false;
                break;
            case undefined:
                console.log('You lose - Out of boundary');
                currentlyPlaying = false;
                break;
            case hat:
                console.log('You found the hat! YOU WIN!');
                currentlyPlaying = false;
                break;
            case fieldCharacter:
                console.log('Keep looking for the hat');
                this.field[this.y][this.x] = pathCharacter;
                break;
            case pathCharacter:
                console.log('You are stepping on *');
                break;
        }
    }

    static generateField(height, width, percentage) {


        const fieldOrHole = (percentage) => {
            if (percentage >= 0 && percentage <= 100) {
                const ranNum = Math.random() * 100;
                if (ranNum < percentage) {
                    return hole;
                } else {
                    return fieldCharacter;
                }
            } else {
                console.log('Please enter a number between 0 - 100');
            }
        }


        const plainField = () => {
            function makeWidthArray() {
                let widthArray = [];
                for (let i = 0; i < width; i++) {
                    widthArray.push(fieldOrHole(percentage));
                }
                return widthArray;
            }
            let plainField = [];
            for (let i = 0; i < height; i++) {
                plainField.push(makeWidthArray());
            }
            return plainField;
        }

        const gameReadyField = plainField();


        do {
            gameReadyField[Math.floor(Math.random() * height)][Math.floor(Math.random() * width)] = hat;
        } while (gameReadyField[0][0] == hat);


        gameReadyField[0][0] = pathCharacter;

        return gameReadyField;
    }

}

//a random field for the "myField"
//generateField() has 3 parameters,(y-axis, x-axis and the percentage of holes between 0 - 100.)

const myField = new Field(Field.generateField(10, 10, 30));

function game() {
    while (currentlyPlaying) {
        console.log(myField.print());
        myField.ask();
        myField.checkWin();
    }
    console.log('Game Over!');
}

game();