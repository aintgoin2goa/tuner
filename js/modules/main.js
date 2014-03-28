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
    function (context, bind, ViewModel, synth, analyser, visualizer) {
        var guessing = false;

		function updateSynthType(){
			var select = document.getElementById("type");
			synth.type = select.options[select.selectedIndex].value;
		}

		updateSynthType();
		document.getElementById("type").addEventListener("change", updateSynthType);

		synth.onNote(function(key, frequency){
			ViewModel.currentNote = key;
			ViewModel.currentFrequency = frequency;
			guessing = true;
		});

		synth.onNoteEnd(function(){
			guessing = false;
		});


		bind(ViewModel, "currentNote").to(document.getElementById("currentKey"), "innerText");
		bind(ViewModel, "currentFrequency").to(document.getElementById("currentFrequency"), "innerText");
		bind(ViewModel, "fundamentalFrequency").to(document.getElementById("fundamentalFrequency"), "innerText");

		synth.connect(analyser.input);
		analyser.connect(context.destination);

		synth.init();
		analyser.init();
		visualizer.init(analyser.size / 2);
	}
);