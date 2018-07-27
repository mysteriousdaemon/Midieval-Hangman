//Giant hangman object, houses logic and variables.
//Literal object notation
var hangmanGame = { 
//objects within objects
	wordsToPick: {
		bellytimber: {
			word: "bellytimber",
			picture: "food.jpg",
			definition: "Food."
		},
		earthapple: {
			word: "earthapple",
			picture: "potato.jpg",
			definition: "A cucumber or potato." 
		},
		fellowfeel: {
			word: "fellowfeel",
			picture: "fellowfeel.jpg",
			definition: "To share another's feelings, to sympathize with."
		},
		hoddypeak: {
			word: "hoddypeak",
			picture: "jester.jpg",
			definition: "A simpleton, blockhead."
		},
		gundygut: {
			word: "gundygut",
			picture: "glutton.jpg",
			definition: "A glutton."
		},
		hardshewer: {
			word: "hardshewer",
			picture: "stonemason.jpg",
			definition: "A stonemason."
		},
		inwit: {
			word: "inwit",
			picture: "conscience.jpg",
			definition: "mind, reason, intellect, conscience."
		},
		jubbe: {
			word: "jubbe",
			picture: "jubbe.jpg",
			definition: "A large vessel for liquor."
		},
		lickspigot: {
			word: "lickspigot",
			picture: "lickspigot.jpg",
			definition: "One who fawns or behaves in a servile manner."
		},
		melpomenish: {
			word: "melpomenish",
			picture: "melpominish.jpg",
			definition: "tragic."
		},
		pumpkinification: {
			word: "pumpkinification",
			picture: "pumpkinification.jpg",
			definition: "Pompous behavior or exaggerated praise."
		},
		recooper: {
			word: "recooper",
			picture: "recooper.jpg",
			definition: "Recooperate."
		},
		smellsmock: {
			word: "smellsmock",
			picture: "smellsmock.jpg",
			definition: "A liscentious man."
		},
		tablinghouse: {
			word: "tablinghouse",
			picture: "tablinghouse.jpg",
			definition: "A gambling house."
		}
	},

	// Variables that set the initial state of our hangman game.
	wordInPlay: null,
	lettersOfTheWord: [],
	matchedLetters: [],
	guessedLetters: [],
	guessesLeft: 0,
	totalGuesses: 0,
	letterGuessed: null,
	wins: 0,

	//hangmanGame method used to start the game and harvest user input
	setupGame: function() {
		// Here we pick a random word.
		var objKeys = Object.keys(this.wordsToPick);
		this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];
		// Split the chosen word up into its individual letters.
		this.lettersOfTheWord = this.wordInPlay.split("");
	    // Builds the representation of the word we are trying to guess and displays it on the page.
	    // At the start it will be all underscores since we haven't guessed any letters ("_ _ _ _").
	    this.rebuildWordView();
	    // This function sets the number of guesses the user gets, and renders it to the HTML.
	    this.processUpdateTotalGuesses(); 
	},

	//method runs whenever the user guesses a letter:
	updatePage: function(letter) {
		if (this.guessesLeft === 0) {
			this.restartGame();
		}
		// otherwise.
		else {
			//check for and handle incorrect guesses.
			this.updateGuesses(letter);
			//check for and handle correct guesses.
			this.updateMatchedLetters(letter);
			//Rebuild the view of the word. Guessed letters are revealed. Unguessed letters blank.
			this.rebuildWordView();
			//If the user wins, restart game.
			if (this.updateWins() === true) {
				this.restartGame();
			}
		}
	},

	//Function handles incorrect guesses that haven't been guessed before:
	updateGuesses: function(letter) {
		//if the letter is not in the guessedLetters array AND the letter is not in the lettersOfTheWord array...
		if ((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfTheWord.indexOf(letter) === -1)) {
		//add letter to guessedLetters array.
		this.guessedLetters.push(letter);
		//decrease guesses by one.
		this.guessesLeft--;
		//update guesses remaining and guessed letters on the page.
		document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
		document.querySelector("#guessed-letters").innerHTML = 
		this.guessedLetters.join(", ");
		}
	},

	// Function sets the initial guesses the user gets.
	processUpdateTotalGuesses: function() {
		//The user will get more guesses the longer the word is.
		this.totalGuesses = this.lettersOfTheWord.length + 3;
		this.guessesLeft = this.totalGuesses;

		//Render the guesses left to the page.
		document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
	},

	//This function governs what happens if the user makes a correct guess.
	updateMatchedLetters: function(letter) {
		//loop through letters in the "solution".
		for (var i = 0; i < this.lettersOfTheWord.length; i++) {
			//if the guessed letter is in the solution AND it has not already been guessed.
			if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
				//push the newly guessed letter into the matchedLetters array.
				this.matchedLetters.push(letter);
			}

		}
	},

	//Function builds the display of the word that is currently being guessed.
	rebuildWordView: function() {
		//start with an empty string;
		var wordView = "";
		//loop through the letters of the word we are trying to guess.
		for (var i = 0; i < this.lettersOfTheWord.length; i++) {
			//If the current letter has been guessed, display the letter.
			if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) !== -1) {
				wordView += this.lettersOfTheWord[i];
			}
			else {
				wordView += "&nbsp;_&nbsp;";
			}
		}
		//Update the page with the new string we built.
		document.querySelector("#current-word").innerHTML = wordView;
	},

	//Function that "restarts" the game by resetting all of the variables.
	restartGame: function() {
		document.querySelector("#guessed-letters").innerHTML = "";
		this.wordInPlay = null;
		this.lettersOfTheWord = [];
		this.matchedLetters = [];
		this.guessedLetters = [];
		this.guessesLeft = 0;
		this.totalGuesses = 0;
		this.lettersGuessed = null;
		this.setupGame();
		this.rebuildWordView();
	},

	//Function that checks to see if the user has won.
	updateWins: function() {
		var win;

		// this won't work for words with double or triple letters
    	// var lettersOfTheWordClone = this.lettersOfTheWord.slice(); //clones the array
    	// this.matchedLetters.sort().join('') == lettersOfTheWordClone.sort().join('')

		//If you haven't correctly guessed a letter in the word yet, we set win to false.
		if (this.matchedLetters.length === 0) {
			win = false;
		//otherwise set win to true.
		}
		else {
			win = true;
		}

		//If a letter appears in the lettersOfTheWord array, but not in the matchedLetter array, set the win to false.
		//Simply, If you haven't guessed all the letters of the word, you don't win.
		for (var i = 0; i < this.lettersOfTheWord.length; i++) {
			if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) === -1) {
				win = false;
			}
		}
		//if the win is true...
		if (win) {
			//Increment wins.
			this.wins = this.wins + 1;
			//update the wins on the page.
			document.querySelector("#wins").innerHTML = this.wins;
			//!!!!!!! Update the word (song title) and definition (band) on the page.
			document.querySelector("#visual").innerHTML = this.wordsToPick[this.wordInPlay].word + " <em>Def:</em> " + this.wordsToPick[this.wordInPlay].definition;

			//update the image of the word on the page.
			document.querySelector("#image-div").innerHTML = 
				"<img class='word-image img-fluid' src='images/" +
				this.wordsToPick[this.wordInPlay].picture + "' alt='" + 
				this.wordsToPick[this.wordInPlay].word + "'>";

			//return true which will trigger game restart in the updatePage function.
			return true;
		}
		//If win is false,return false to the updatePage function. Game goes on.
		return false;
	}
};

//initialize game when page loads hangmanGame();
hangmanGame.setupGame();
//when a key is pressed...
document.onkeyup = function(event) {
	//capture pressed key and make it lowercase.
	hangmanGame.letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	//Pass the guessed letter into our updatePage function to run the game logic.
	hangmanGame.updatePage(hangmanGame.letterGuessed);
};

//end of game

/*	
	document.onkeyup = function(event) {
		var userGuess = event.key;
		var randomWord = wordsToPick[Math.floor(Math.random() * wordsToPick.length)];

		for (var i = 0; i < randomWord.length; i++) {
		if (userGuess === randomWord.charAt(i)) {
			document.getElementById("#").innerHTML = userGuess;
		}
		else if (userGuess !== #.charAt(i)) {
			document.getElementById("guessed-letters").innerHTML = userGuess;
		}


var term =  {
	words: ["bellytimber", "earthapple", "fellowfeel", ""];
}
*/
