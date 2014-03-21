require(
	[
		"audioContext",
		"bind",
		"viewModel",
		"synth",
		"analyser",
		"visualizer",
		"toneGuesser"
	],
	function(context,  bind, ViewModel, synth, analyser, visualizer, guesser){

		var guessing = false;

		synth.onNote(function(key, frequency){
			ViewModel.currentNote = key;
			ViewModel.currentFrequency = frequency;
			guessing = true;
			requestAnimationFrame(makeGuess);
		});

		synth.onNoteEnd(function(){
			guessing = false;
		});

		function makeGuess(){
			var guesses = guesser.guess();
			ViewModel.frequencyGuesses = guesses;
			ViewModel.guessAverage = (function(){
				var total = guesses.reduce(function(previous, current){
					return previous + current;
				}, 0);
				return total / guesses.length;
			}());
			guessing && requestAnimationFrame(makeGuess);
		}



		bind(ViewModel, "currentNote").to(document.getElementById("currentKey"), "innerText");
		bind(ViewModel, "currentFrequency").to(document.getElementById("currentFrequency"), "innerText");
		bind(ViewModel, "frequencyGuesses").to(document.getElementById("frequencyGuesses"), "innerText").using(function(val){
			return val.join(", ");
		});
		bind(ViewModel, "guessAverage").to(document.getElementById("guessAverage"), "innerText");


		synth.connect(analyser.input);
		analyser.connect(context.destination);

		synth.init();
		analyser.init();
		visualizer.init(analyser.size / 2);
	}
);