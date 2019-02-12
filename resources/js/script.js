var numSquares = 9;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll('.square');
var colorDisplay = document.querySelector('span');
var messageDisplay = document.querySelector('#messageDisplay');
var h1 = document.querySelector('h1');
var resetButton = document.querySelector('#reset');
// var easyBtn = document.querySelector('#easyBtn');
// var hardBtn = document.querySelector('#hardBtn');
var modeButtons = document.querySelectorAll('.mode');

//Loads code on page open.
init();

function init() {
    setUpModeButtons();
    setUpSquares();
    reset();
}

function setUpModeButtons() {
    //Mode buttons and event listeners.
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener('click',function() {
            modeButtons[0].classList.remove('selected');
            modeButtons[1].classList.remove('selected');
            modeButtons[2].classList.remove('selected');
            this.classList.add('selected');
            //Can be used to add more modes.
            if (this.textContent === 'Easy') {
                numSquares = 3;
            } else if (this.textContent === 'Medium') {
                numSquares = 6;
            } else {
                numSquares = 9;
            }
            reset();
        });
    }
}

function setUpSquares() {
    //Event listeners for square clicks.
    for (var i = 0; i < squares.length; i ++) {
        squares[i].addEventListener('click',function() {
            var clickedColor = this.style.backgroundColor;
            //console.log(clickedColor,pickedColor); Could be used to debug color outputs.
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = 'Correct';
                resetButton.textContent = ('Play again!');
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;        
            } else {
                this.style.backgroundColor = '#232323';
                messageDisplay.textContent = 'Try again!';
            }
        });
    }
}

function reset() {
    //Generate new colors on button click.
    colors = generateRandomColors(numSquares);
    //Choose new picked/correct color.
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    //Reset 'Play Again' back to 'New Colors'.
    resetButton.textContent = 'New Colors';
    //Reset message when game is reset.
    messageDisplay.textContent = '';
    //Same for loop as before to assign each square a color.
    for (var i = 0; i < squares.length; i ++) {
        //If index is out of loop range, squares will display as none.
        if (colors[i]) {
            squares[i].style.display = 'block';
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = 'none';
        }
    }
    h1.style.backgroundColor = 'blue';
}

resetButton.addEventListener('click',reset);


function changeColors(color) {
    for (var i = 0; i < squares.length; i ++) {
        squares[i].style.background = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length); //Generating random index for list and flooring the float to a whole number.
    return colors[random];
}

function generateRandomColors(num) {
    //Generates list of random colors.
    var arr = [];
    for (var i = 0; i < num; i ++) { //Would repeat num times pushing, num elements into our color list.
        arr.push(randomColor());
    }
    return arr;
}

function randomColor() {
    //Generates ONE random color.
    //Math.random for 3 values: R, G, B
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ', ' + g + ', ' + b + ')'  
}