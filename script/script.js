var diceImages = ["./images/dice-face-one.png", "./images/dice-face-two.png", "./images/dice-face-three.png", 
    "./images/dice-face-four.png", "./images/dice-face-five.png", "./images/dice-face-six.png"];

const renderModal = () => {
    for ( let i = 0; i < 2; i++ ) {
        const gridItem = document.querySelectorAll("#probModal div.grid-item")[i];
        for ( let j = 0; j < 6; j++ ) {
            let id = "dice_" + i + "_" + j;

            let label = document.createElement("label");
            label.innerText = j+1 + ": ";
            label.for =  "#" + id;

            let input = document.createElement("input");
            input.id = id;
            input.classList.add("probInput");
            input.type = "number";
            input.step = "0.01";
            input.min = "0";
            input.defaultValue = "1";

            let nextLine = document.createElement("br");

            label.append(input);
            gridItem.append(label);
            gridItem.append(nextLine);       
        }
    }
}
renderModal();

class Dice {
    constructor(probs = [1, 1, 1, 1, 1, 1]) {
        this.probs = probs.map((sum => value => sum += value)(0));
    }

    rollDice() {
        console.log(this.probs);
        let res =  Math.random() * this.probs[5];
        for ( let i = 0; i < 6; i++ ) {
            if ( res < this.probs[i] ) return i;
        }
        return 5;
    }
}

var dice1 = new Dice();
var dice2 = new Dice();

function saveSettings() {
    let probs = [];
    document.querySelectorAll('.probInput').forEach((ele) => {
        
        probs.push(parseFloat(ele.value));
    })
    dice1 = new Dice(probs.slice(0, 6));
    dice2 = new Dice(probs.slice(6, 12));

    document.getElementById("probModal").style.display = "None";

    let exp1 = 0, exp2 = 0, total = 0;
    probs.slice(0, 6).forEach((prob, index) => {
        exp1 += prob * (index + 1);
        total += prob;
    });
    exp1 = exp1 / total;

    probs.slice(0, 6).forEach((prob, index) => {
        exp2 += prob * (index + 1);
        total += prob;
    });
    exp2 = exp2 / total;

    let tooltip = document.querySelector(".tooltiptext");
    tooltip.innerHTML = "expected value of the dice1's roll = " + exp1 + "<br>" +
                        "expected value of the dice2's roll = " + exp2;
}

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

function showTips() {
    document.querySelector(".tooltiptext").classList.toggle("hidden");
}

function reset() {
    window.location.reload();
}

