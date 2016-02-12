$(document).ready(function() {
	randomNumber =  ~~(Math.random() * 100);
	guessesRemaining = 5;
	console.log("random number = " + randomNumber +  "\nguessesRemaining = " + guessesRemaining);
	$('[data-toggle="popover"]').popover();	
	$statusEle = $('#status');
	$('#playerGuess').on('focus', function() {
		$(this).popover('hide');
	});
	$('#submitGuess').on('click', doesNumberToGuessExist);
	$('#playerRequestsHint').on('click', hint);
	$('#playerPlaysAgain').on('click', function() {
		location.reload();
	});
	$('#playerGuess').on('keydown', function(event) {
		if (event.which == 13) {
			doesNumberToGuessExist();
		}
	});
});

function doesNumberToGuessExist() {
	var guess = $('#playerGuess').val();
	$('#playerGuess').val("");
	if (badGuessCheck(guess)) {
		return;
	}
	guessesRemaining -= 1;
	if (guess == randomNumber) {
		setGameOver("<strong>You Win!</strong><br> " + guess + "is correct!", "alert-success<br>" );
	} else if (guessesRemaining === 0) {
		setGameOver("<strong>You're out of guesses!</strong><br>", "alert-danger" );
	} else {
		setGuessProximity(guess);
		
	}
}

function hint() {
	var guess = $('#playerGuess').val();
	$('#playerGuess').val("");
	$('#playerRequestsHint').blur();
	
	if (badGuessCheck(guess)) {
		return;
	}
	setGuessProximity(guess);	
}

function setGameOver(text, alertType) {
	$('.btn:not(#playerPlaysAgain)').prop('disabled', true);
	$('.input').prop('disabled', true) ;	
	setAlertText(text + "Click Play Again.", alertType);
	text = text.replace("<br>", "\n");
	text = text.replace(/<[^>]*>/g, "");
	if (confirm(text + "Would you like to play again?")) {
		location.reload();
	}
}


function badGuessCheck(guess) {
	if (guess == '') {
		$statusEle.closest('.row').addClass("invisible");
		$('#playerGuess').popover('show');
		return true;
	} else if (isNaN(guess) || guess > 100 || guess < 1) {
		setAlertText("<strong>Invalid Guess!</strong><br>Your guess must be a number between 1 and 100.", "alert-info");
		return true;
	} else {
		return false;
	}
}

function setAlertText(alertMessage, alertType) {
	$('.invisible').removeClass('invisible');
	
	$statusEle.removeClass().addClass("alert fade");
	window.setTimeout(function() {
		setGuessesRemaining();
		$statusEle.html(alertMessage);
		$statusEle.addClass(alertType + " in");
	}, 500);

}

function setGuessProximity(x) {
	var guessProximity = Math.abs(x - randomNumber);

	if (guessProximity > 80) {
		setAlertText("<strong> ICE COLD!!! </strong>You're way off.", "alert-info");
	} else if (guessProximity > 40) {
		setAlertText("<strong> Cold! </strong>That guess was way off", "alert-success");
	} else if (guessProximity > 10) {
		setAlertText("<strong> Warm! </strong>You're triangulating", "alert-warning");
	} else {
		setAlertText("<strong> ON FIRE!!! </strong>H_H_H_HEADSHOT!!!", "alert-danger");
	}
}




function setGuessesRemaining() {
	if (guessesRemaining === 1) {
		$('#guess-count').text("You only have " + guessesRemaining + " guess remaining.");		
	} else {
		$('#guess-count').text("You only have " + guessesRemaining + " guesses remaining.");
	}
}




