


document.getElementById("#").innerHTML = #;
document.getElementById("#").innerHTML = #;
document.getElementById("#").innerHTML = #;


var hangmanGame = {
	wordsToPick: {
		bellytimber: {
			picture: "food.jpg",
			definition: 
		},
		earthapple: {
			picture: "potato.jpg",
			definition: "A cucumber or potato" 
		},
		fellowfeel: {
			picture: "fellowfeel.jpg",
			defition: "To share another's feelings, to sympathize with."
		},
		hoddypeak: {
			picture: "idiot.jpg",
			definition: "A simpleton, blockhead."
		},
		gundygut: {
			picture: "fat.jpg",
			definition: "A glutton."
		},
		hardshewer: {
			picture: "stonemason.jpg",
			definition: "A stonemason."
		},
		Inwit: {
			picture: "conscience.jpg",
			definition: "mind, reason, intellect, conscience."
		},
		jubbe: {
			picture: "jubbe.jpg",
			definition: "A large vessel for liquor."
		},
		lickspigot: {
			picture: "lickspigot.jpg";
			definition: "One who fawns or behaves in a servile manner."
		},
		melpomenish: {
			picture: "melpominish.jpg",
			definition: "tragic."
		},
		pumpkinification: {
			picture: "pumpkinification",
			definition: "Pompous behavior or exaggerated praise."
		},
		Recooper: {
			picture: "recooper.jpg",
			definition: "Recooperate",
		},
		Smellsmock: {
			picture: "smellsmock.jpg",
			definition: "A liscentious man."
		},
		tablinghouse: {
			picture: "tablinghouse.jpg",
			definition: "A gambling house."
		}

		
	}

}

var term =  {
	words: ["bellytimber", "earthapple", "fellowfeel", ""];
}

var wordChoice = term.words;

document.onkeyup = function(event) {

	var userGuess = event.key;
	var randomWord = wordChoice[Math.floor(Math.random() * wordChoice.length)];

	for (var i = 0; i < randomWord.length; i++) {
		if (userGuess === randomWord.charAt(i)) {
			document.getElementById("#").innerHTML = userGuess;
		}
		else if (userGuess !== #.charAt(i)) {
			document.getElementById("guessed-letters").innerHTML = userGuess;
		}

}
