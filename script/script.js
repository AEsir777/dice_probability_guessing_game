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

    var result = '1';
    if ( dice1 > dice2 ) {
        document.querySelector("label").innerHTML = "Player 1 Wins!";
    } else if ( dice1 < dice2 ) {
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
    
    document.querySelector("button.start").classList.toggle("isHidden");
    document.querySelector("select").classList.toggle("isHidden");
    document.querySelector("button.restart").classList.toggle("isHidden");
}


function reset() {
    document.querySelector("h1.neonBorder").innerHTML = "Will you win this game?";
    document.querySelector("label").innerHTML = "Make your guess using the dropdown below";

    document.querySelector("button.start").classList.toggle("isHidden");
    document.querySelector("select").classList.toggle("isHidden");
    document.querySelector("button.restart").classList.toggle("isHidden");
}

