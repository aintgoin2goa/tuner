define([], function NotesModule(){

	var data = [
		/* Octave 0 */ {},
		/* Octave 1 */ {},
		/* Octave 2 */ {},
		/* Octave 3 */ {},
		/* Octave 4 */ {C:261.63, 'C#':277.18 ,D:293.66, Eb:311.13, E:329.63, F:349.23, 'F#':369.99, G:392.00, 'G#':415.30, A:440.00, Bb:466.16, B:493.88},
		/* Octave 5 */ {},
		/* Octave 6 */ {},
		/* Octave 7 */ {},
		/* Octave 8 */ {},
	]

	return{
		getFrequency: function(note, octave){
			return data[octave][note];
		}
	}


});