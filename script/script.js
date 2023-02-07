var diceImages = ["./images/dice-face-one.png", "./images/dice-face-two.png", "./images/dice-face-three.png", 
    "./images/dice-face-four.png", "./images/dice-face-five.png", "./images/dice-face-six.png"];

class Dice {
    constructor(probs = [1, 1, 1, 1, 1, 1]) {
        let cumSum = 0;
        this.probs = probs.map((sum => value => sum += value)(0));
    }

    rollDice() {
        let res =  Math.random() * this.probs[5];
        
        for ( let i = 0; i < 6; i++ ) {
            if ( res <= this.probs[i] ) return i;
        }
        return 5;
    }
}

const dice1 = new Dice();
const dice2 = new Dice();

// input prompt for dice probability
// alert("Let's start the guessing game for two biased dices!");

/*
[...Array(6).keys()].forEach(idx) {
    diceProb1[idx] = prompt("Please enter the probability: ");
}; */

// function for clicking on start guessing
function startGame() {
    if ( document.getElementById("guess").value === '' ) {
        alert("Please enter the guess!");
        return;
    }

    const diceRes1 = dice1.rollDice();
    const diceRes2 = dice2.rollDice();

    document.getElementById("diceRes1").setAttribute("src", diceImages[diceRes1]);
    document.getElementById("diceRes2").setAttribute("src", diceImages[diceRes2]);

    console.log(document.getElementById("guess").value);

    var result = '1';
    if ( diceRes1 > diceRes2 ) {
        document.querySelector("label").innerHTML = "Player 1 Wins!";
    } else if ( diceRes1 < diceRes2 ) {
        document.querySelector("label").innerHTML = "Player 2 Wins!";
        result = '2';
    } else {
        document.querySelector("label").innerHTML = "It is a draw!";
        result = '3';
    }

    if ( document.getElementById("guess").value === result )
        document.querySelector("h1.neonBorder").innerHTML = "You won the game!";
    else 
        document.querySelector("h1.neonBorder").innerHTML = "Booo, you lost!";
    
    document.querySelector("button.start").innerHTML = "Guess again?"
}

function reset() {
    window.location.reload();
}

