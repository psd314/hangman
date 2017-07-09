var liChild;	//will generate <li> element for wrong guesses

hangman = {
	startText : "Let the games begin!!! Guess a letter:",
	wordBank : ["poker", "slots", "roulette", "flush", "casino",
		"elvis", "baccarat", "keno", 
		"pachinko", "hearts"],	
	wins : 0,
	losses : 0,
	guesses : 8,
	word : "",
	removeCorrectGuesses : "",
	blank : "<li>__ &nbsp;</li>",
	wrongLetters : "",
	userInput : "",
	wordSelect: function() {
		var random = Math.floor(Math.random() * 10);
		var word = this.wordBank[random];
		console.log(word);
		return word
	},
	wordGenerate: function () {
		this.word = this.wordSelect();
		this.removeCorrectGuesses = this.word;
		//generate correct number of blank slots 
		for (var i = 1; i < this.word.length; i++) {
			hangman.blank += "<li>__ &nbsp;</li>";
		}		
		document.getElementById('blanks').innerHTML = hangman.blank;
	},
	newGame : function () {
		this.guesses = 8;
		this.wrongLetters = "";
		this.blank = "<li>__ &nbsp;</li>";
		document.getElementById('wrong').innerHTML = this.wrongLetters;
		document.getElementById('guesses').innerHTML =		
		'<p>Guesses: ' + this.guesses + '</p>';	}		
}
document.onkeyup = function(event) {
	if(event.key === 'Enter'){

		document.getElementById('enterText').textContent = hangman.startText; // change introduction text
		hangman.wordGenerate()	// generate first word

		document.onkeyup = function(event) {				
			hangman.userInput = event.key;
			if (hangman.word.indexOf(hangman.userInput) != -1) {	// check if hangman.userInput is in word
				for ( var j = 0; j < hangman.word.length; j++) {	// iterate through word
					if (hangman.userInput === hangman.word[j]) {	// if index matches user input then write hangman.userInput to corresponding blank
						document.getElementById('blanks').children[j].innerHTML = 
						'<li>' + hangman.word[j].toUpperCase() + '&nbsp</li>'; 
					}
				}
				while (hangman.removeCorrectGuesses.indexOf(hangman.userInput) != -1) {	//remove correct letters from copy of word chosen
				hangman.removeCorrectGuesses = hangman.removeCorrectGuesses.replace(hangman.userInput, "");
				}
				if (hangman.removeCorrectGuesses.length === 0) {	//update wins and reset game
					hangman.wins++;
					document.getElementById('wins').innerHTML = "Wins: " + hangman.wins;
					hangman.newGame();
					hangman.wordGenerate();
				}
			} else {	// if no match, substract guesses, write bad letter and remaining guesses to document
				if (hangman.wrongLetters.indexOf(hangman.userInput) === -1) {	// check if letter previously guessed
					hangman.guesses--;
					hangman.wrongLetters += hangman.userInput +', ';
					document.getElementById('guesses').innerHTML =		
						'<p>Guesses: ' + hangman.guesses + '</p>';
					liChild = document.createElement('li');
					document.getElementById('wrong').appendChild(liChild);
					document.getElementById('wrong').children[0].innerHTML =
						'<li>' + hangman.wrongLetters.toUpperCase() + '</li>';
				}
				if (hangman.guesses === 0) {	//update losses and reset game
					hangman.losses++;
					document.getElementById('losses').innerHTML = "Losses: " + hangman.losses;
					hangman.newGame();
					hangman.wordGenerate();
				}
			}							
		}	
	}
}

// add music file for winning
// add stick figure pics












