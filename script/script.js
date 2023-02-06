var diceProb1 = [1, 1, 1, 1, 1, 1]
var diceProb2 = [1, 1, 1, 1, 1, 1]

var diceImages = ["./images/dice-face-one.png", "./images/dice-face-two.png", "./images/dice-face-three.png", 
    "./images/dice-face-four.png", "./images/dice-face-five.png", "./images/dice-face-six.png"];

// input prompt for dice probability
// alert("Let's start the guessing game for two biased dices!");

/*
[...Array(6).keys()].forEach(idx) {
    diceProb1[idx] = prompt("Please enter the probability: ");
}; */

// function for clicking on start guessing
function rollDice() {
    if ( document.getElementById("guess").value === '' ) {
        alert("Please enter the guess!");
        return;
    }

    const dice1 = Math.floor(Math.random() * 6);
    const dice2 = Math.floor(Math.random() * 6);

    document.getElementById("dice1").setAttribute("src", diceImages[dice1]);
    document.getElementById("dice2").setAttribute("src", diceImages[dice2]);

    console.log(document.getElementById("guess").value);

    if ( dice1 > dice2 ) {
        if (document.getElementById("guess").value === '1') document.querySelector("h1.neonBorder").innerHTML = "You are right.";
        else document.querySelector("h1.neonBorder").innerHTML = "You are wrong."; 
        document.querySelector("h1.neonBorder").innerHTML += " Player 1 Wins!";
    }
    else if ( dice1 < dice2 ) {
        if (document.getElementById("guess").value === '2') document.querySelector("h1.neonBorder").innerHTML = "You are right.";
        else document.querySelector("h1.neonBorder").innerHTML = "You are wrong.";
        document.querySelector("h1.neonBorder").innerHTML += " Player 2 Wins!";
    }
    else {
        if (document.getElementById("guess").value === '3') document.querySelector("h1.neonBorder").innerHTML = "You are right.";
        else document.querySelector("h1.neonBorder").innerHTML = "You are wrong.";
        document.querySelector("h1.neonBorder").innerHTML += " It is a draw!";
    }

}

