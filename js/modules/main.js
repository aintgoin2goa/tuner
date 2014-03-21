require(
	[
		"audioContext",
		"bind",
		"viewModel",
		"synth",
		"analyser",
		"visualizer"
	],
	function(context,  bind, ViewModel, synth, analyser, visualizer){

		synth.onNote(function(key, frequency){
			ViewModel.currentlyPlaying = key;
			ViewModel.currentFrequency = frequency;
		});

		bind(ViewModel, "currentNote").to(document.getElementById("currentKey"), "innerText");
		bind(ViewModel, "currentFrequency").to(document.getElementById("currentFrequency"), "innerText");


		synth.connect(analyser.input);
		analyser.connect(context.destination);

		synth.init();
		analyser.init();
		visualizer.init(analyser.size / 2);
	}
);