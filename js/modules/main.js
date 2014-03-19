require(
	[
		"audioContext",
		"notes"
	],
	function(context, notes){

		var oscillator;
		var gainNode = context.createGainNode();
		gainNode.connect(context.destination);

		var playing;
		
		function playSound(e){
			var key = getKey(e.which);
			if(!key){
				return;
			}
			var frequency = notes.getFrequency(key, 4);
			if(playing === frequency){
				return;
			}
			
			console.log(key, frequency);
			oscillator = context.createOscillator();
			oscillator.type = 'triangle';
			oscillator.frequency.value = frequency;
			oscillator.connect(gainNode);
			oscillator.start(0);
			playing = frequency;
		}

		function stopSound(e){
			oscillator.stop();
			playing = null;
		}

		function getKey(code){
			switch(code){
				case 90 : return "C";
				case 88 : return "D";
				case 67 : return "E";
				case 86 : return "F";
				case 66 : return "G";
				case 78 : return "A";
				case 77 : return "B";
				default : return false;
			}
		}

		document.body.addEventListener("keydown", playSound);
		document.body.addEventListener("keyup", stopSound);
	}
);