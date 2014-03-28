define(
	[
		"audioContext",
		"synth"
	],
	function AnalyserModule(context, synth){

        var filter = context.createBiquadFilter();
        filter.type = "lowpass";
		var analyser = context.createAnalyser();
		analyser.fftsize = 512;
		var size = analyser.frequencyBinCount;
		var onUpdateHandlers = [];
		var active = false;
		var currentData = new Uint8Array(size);
        filter.connect(analyser);

		function getFrequency(){
			analyser.getByteFrequencyData(currentData);
			active && requestAnimationFrame(getFrequency);
		}

		function init(){
			active = true;
			requestAnimationFrame(getFrequency);
		}

		return Object.create(null, {
			"input" : {
				get : function(){
					return filter;
				}
			},
			"connect"  : {
				value : function(to){
					analyser.connect(to);
				}
			},
			"init" : {
				value : init
			},
			"stop" : {
				value : function(){
					active = false;
				}
			},
			"data" : {
				get : function(){
					return currentData;
				}
			},
			"size" : {
				get : function(){
					return analyser.frequencyBinCount;
				}
			},
            "filterType" : {
                get : function(){
                    return filter.type;
                },
                set : function(val){
                    filter.type = val;
                }
            }
		});

	}
);