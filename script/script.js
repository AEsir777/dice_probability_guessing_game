var diceImages = ["./images/dice-face-one.png", "./images/dice-face-two.png", "./images/dice-face-three.png", 
    "./images/dice-face-four.png", "./images/dice-face-five.png", "./images/dice-face-six.png"];

// operations regards to the element
const renderModal = () => {
    for ( let i = 0; i < 2; i++ ) {
        const gridItem = $("#probModal div.grid-item")[i];
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
        this.total = this.probs[5];
    }

    rollDice() {
        console.log(this.probs);
        let res =  Math.random() * this.probs[5];
        for ( let i = 0; i < 6; i++ ) {
            if ( res < this.probs[i] ) return i;
        }
        return 5;
    }

    cdf(i) {
        return this.probs[i] / this.total;
    }

    tdf(i) {
        return 1 - this.probs[i] / this.total;
    }

    pmf(i) {
        if ( i== 0 ) return this.probs[0] / this.total;
        return (this.probs[i] - this.probs[i - 1]) / this.total;
    }
}

var dice1 = new Dice();
var dice2 = new Dice();

function saveSettings() {
    let probs = [];
    $('.probInput').each(function() {
        probs.push(parseFloat($(this).val()));
    });
    dice1 = new Dice(probs.slice(0, 6));
    dice2 = new Dice(probs.slice(6, 12));

    $("#probModal").css("display", "None");

    ans = dice1.tdf(0) * dice2.pmf(0) +  dice1.tdf(2) * dice2.pmf(2) + dice1.tdf(3) * dice2.pmf(3) +
        dice1.tdf(4) * dice2.pmf(4);
    ans2 = dice1.pmf(0) * dice2.pmf(0) +  dice1.pmf(2) * dice2.pmf(2) + dice1.pmf(3) * dice2.pmf(3) +
        dice1.pmf(4) * dice2.pmf(4) + dice1.pmf(5) * dice2.pmf(5);
    

    $("#middle").html("= " + dice1.tdf(0).toFixed(2) + " &times; " + dice2.pmf(0).toFixed(2) + " + " +
        dice1.tdf(1).toFixed(2) + " &times; " + dice2.pmf(1).toFixed(2) + " + " +
        dice1.tdf(2).toFixed(2) + " &times; " + dice2.pmf(2).toFixed(2) + " + " +
        dice1.tdf(3).toFixed(2) + " &times; " + dice2.pmf(3).toFixed(2) + " + " +
        dice1.tdf(4).toFixed(2) + " &times; " + dice2.pmf(4).toFixed(2));
    $("#final").html("= " + ans.toFixed(2));
    $("#equal-ans").html("P(X = Y) = " + ans2.toFixed(2));
}

// input prompt for dice probability
// alert("Let's start the guessing game for two biased dices!");

/*
[...Array(6).keys()].forEach(idx) {
    diceProb1[idx] = prompt("Please enter the probability: ");
}; */

// function for clicking on start guessing
function startGame() {
    if ( $("#guess").value === '' ) {
        alert("Please enter the guess!");
        return;
    }

    const diceRes1 = dice1.rollDice();
    const diceRes2 = dice2.rollDice();

    $("#diceRes1").attr("src", diceImages[diceRes1]);
    $("#diceRes2").attr("src", diceImages[diceRes2]);

    console.log($("#guess").val());

    var result = '1';
    if ( diceRes1 > diceRes2 ) {
        $("label").text("Player 1 Wins!");
    } else if ( diceRes1 < diceRes2 ) {
        $("label").text("Player 2 Wins!");
        result = '2';
    } else {
        $("label").text("It is a draw!");
        result = '3';
    }

    if ( $("#guess").val() === result )
        $("h1.neonBorder").text("You won the game!");
    else 
        $("h1.neonBorder").text("Booo, you lost!");
    
    $("button.start").text("Guess again?");
}

function toggleTips() {
    $("#tipModal").toggleClass("hidden");
    $("#show-ans").removeClass("hidden");
    $("#equal-ans").addClass("hidden");
}

function equalProb() {
    $("#show-ans").addClass("hidden");
    $("#equal-ans").removeClass("hidden");
}
 
function reset() {
    window.location.reload();
}

// add event listeners
$("button.start").on("click", startGame);
$("button.reset").on("click", reset);
$("button.tips").on("click", toggleTips);
$("#close").on("click", toggleTips);
$("#show-ans").on("click", equalProb);

