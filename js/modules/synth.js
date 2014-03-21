define(
	[
		"audioContext",
		"notes"
	], 
	function SynthModule(context, notes){

		var oscillators = {};
		var gainNode = context.createGainNode();
		var onNoteHandlers = [];

		function playSound(e){
			var key = getKey(e.which);
			if(!key){
				return;
			}

			var frequency = notes.getFrequency(key, 4);
			if(oscillators[frequency.toString()]){
				return;
			}

			var oscillator = context.createOscillator();
			oscillator.type = 'sine';
			oscillator.frequency.value = frequency;
			oscillator.connect(gainNode);
			oscillators[frequency.toString()] = oscillator;
			oscillators[frequency.toString()].start(0);
			onNoteHandlers.forEach(function(handler){
				handler(key, frequency);
			});
		}

		function stopSound(e){
			if(e.which === 27){
				return stopAll();
			}

			var key = getKey(e.which);
			if(!key){
				return;
			}

			var frequency = notes.getFrequency(key, 4);
			var oscillator = oscillators[frequency.toString()];
			oscillator && oscillator.stop();
			delete oscillators[frequency.toString()];
			onNoteHandlers.forEach(function(handler){
				handler("", null);
			});
		}

		function getKey(code){
			switch(code){
				case 90 : return "C";
				case 83 : return "C#";
				case 88 : return "D";
				case 68 : return "Eb";
				case 67 : return "E";
				case 86 : return "F";
				case 71 : return "F#";
				case 66 : return "G";
				case 72 : return "G#";
				case 78 : return "A";
				case 74 : return "Bb";
				case 77 : return "B";
				default : return false;
			}
		}

		function stopAll(){
			Object.keys(oscillators).forEach(function(o){
				oscillators[o].stop();
			});
		}

		function init(){
			document.body.addEventListener("keydown", playSound);
			document.body.addEventListener("keyup", stopSound);	
		}

		function onNote(handler){
			onNoteHandlers.push(handler);
		}

		return Object.create(null, {
			"init" : {
				value : init
			},
			"onNote" : {
				value : onNote
			},
			"connect" : {
				value : function(to){
					gainNode.connect(to);
				}
			}
		});
	}
);