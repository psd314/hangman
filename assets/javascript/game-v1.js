//Version 1, works but  not DRY

var enterCount;
var word;
var userInput;
var liChild;
var removeCorrectGuesses;

hangman = {
	startText : "Let the games begin!!! Guess a letter:",
	wordBank : ["poker", "slots", "roulette", "flush", "casino",
		"elvis", "baccarat", "keno", 
		"pachinko", "hearts"],	
	wins : 0,
	losses : 0,
	guesses : 8,
	wordSelect: function() {
		var random = Math.floor(Math.random() * 10);
		var word = this.wordBank[random];
		console.log(word);
		return word
	},
	blank : "<li>__ &nbsp;</li>",
	wrongLetters : ""
}
document.onkeyup = function(event) {
	//enterCount = 0; add && and test to prevent multiple Enter's
	if(event.key === 'Enter'){
		// change introduction text
		document.getElementById('enterText').textContent = hangman.startText;
	
		// generate word
		word = hangman.wordSelect();
		removeCorrectGuesses = word;
		//generate correct number of blank slots 
		for (var i = 1; i < word.length; i++) {
			hangman.blank += "<li>__ &nbsp;</li>";
		}		
		document.getElementById('blanks').innerHTML = hangman.blank;
		
		document.onkeyup = function(event) {				
			userInput = event.key;
			if (word.indexOf(userInput) != -1) {	// check if userInput is in word
				for ( var j = 0; j < word.length; j++) {	// iterate through word
					if (userInput === word[j]) {	// if index matches user input then write userInput to corresponding blank
						document.getElementById('blanks').children[j].innerHTML = 
						'<li>' + word[j].toUpperCase() + '&nbsp</li>'; 
					}
				}
				while (removeCorrectGuesses.indexOf(userInput) != -1) {
				removeCorrectGuesses = removeCorrectGuesses.replace(userInput, "");
				}
				if (removeCorrectGuesses.length === 0) {
					hangman.wins++;
					hangman.guesses = 8;
					hangman.wrongLetters = "";
					document.getElementById('wins').innerHTML = "Wins: " + hangman.wins;
					document.getElementById('wrong').innerHTML = hangman.wrongLetters;
					document.getElementById('guesses').innerHTML =		
					'<p>Guesses: ' + hangman.guesses + '</p>';

					word = hangman.wordSelect();
					removeCorrectGuesses = word;
					hangman.blank = "<li>__ &nbsp;</li>";
					for (var i = 1; i < word.length; i++) {
					hangman.blank += "<li>__ &nbsp;</li>";
					}		
					document.getElementById('blanks').innerHTML = hangman.blank;
				}
			} else {	// if no match, substract guesses, write bad letter and remaining guesses to document
				hangman.guesses--;
				hangman.wrongLetters += userInput +', ';
				document.getElementById('guesses').innerHTML =		
					'<p>Guesses: ' + hangman.guesses + '</p>';
				liChild = document.createElement('li');
				document.getElementById('wrong').appendChild(liChild);
				document.getElementById('wrong').children[0].innerHTML =
					'<li>' + hangman.wrongLetters.toUpperCase() + '</li>';
				if (hangman.guesses === 0) {
					hangman.losses++;
					hangman.guesses = 8;
					hangman.wrongLetters = "";
					document.getElementById('losses').innerHTML = "Losses: " + hangman.losses;
					document.getElementById('wrong').innerHTML = hangman.wrongLetters;
					document.getElementById('guesses').innerHTML =		
					'<p>Guesses: ' + hangman.guesses + '</p>';
					word = hangman.wordSelect();
					removeCorrectGuesses = word;
					hangman.blank = "<li>__ &nbsp;</li>";
					for (var i = 1; i < word.length; i++) {
					hangman.blank += "<li>__ &nbsp;</li>";
					}		
					document.getElementById('blanks').innerHTML = hangman.blank;
				}
			}							
		}	
	}
}
	












