var randomNumber =  ~~(Math.random() * 100);
var guessesRemaining = 5;
console.log("random number = " + randomNumber +  "\nguessesRemaining = " + guessesRemaining);
var alertorigstyle = document.getElementById("status").style.display;
document.getElementById("status").style.display = 'none';

function doesNumberToGuessExist() {
	var x = document.getElementById("playerGuess").value;

	if (x == randomNumber) {
		if (confirm("You've guessed the number! " + x + " is correct!  Would you like to play again?")) {
			playAgain();
		} 
	} else {
		guessesRemaining -= 1;
		if (guessesRemaining === 0) {
			if (confirm("That's not correct, and you're out of guesses!  Would you like to play again?")) {
				playAgain();
			}
		} else {
			hint();
			document.getElementById("guess-count").innerHTML = setGuessesRemaining();
		}	
	}	
}



function playAgain() {
	location.reload();
}

function setGuessesRemaining(temp) {
	if (guessesRemaining === 1) {
		return "That guess was " + temp + ", and you only have " + guessesRemaining + " guess remaining";
	} else {
		return "That guess was " + temp + ", and you only have " + guessesRemaining + " guesses remaining";
	}
}

function hint() {
	var x = document.getElementById("playerGuess").value;
	var diff = Math.abs(x - randomNumber);
	guessesRemaining -= 1;
	switch (true) {
		
		case (diff > 80):
			document.getElementById("status").style.display = alertorigstyle;
			document.getElementById("status").innerHTML = setGuessesRemaining("freezing");
			break;
		case (diff > 30):
			document.getElementById("status").style.display = alertorigstyle;
			document.getElementById("status").innerHTML = setGuessesRemaining("cold");
			break;
		case (diff > 10):
			document.getElementById("status").style.display = alertorigstyle;
			document.getElementById("status").innerHTML = setGuessesRemaining("hot");
			break;
		default:
			document.getElementById("status").style.display = alertorigstyle;
			document.getElementById("status").innerHTML = setGuessesRemaining("burning");
			break;
	}
	
	document.getElementById("guess-count").innerHTML = setGuessesRemaining();

}