define(
	[
		"audioContext",
		"notes",
		"analyser",
		"hps"
	],
	function ToneGuesserModuler(context, notes, analyser, hps){

		function guess(){
			var data = analyser.data;
			var possibles = [];
			for(var i=0, l=data.length; i<l ;i++){
				if(data[i] === 255){
					possibles.push((i * context.sampleRate / analyser.size) / 2);
				}
			}
			return possibles;
		}

		return Object.create(null, {
			"guess" : {
				value : guess
			}
		});

	}
)