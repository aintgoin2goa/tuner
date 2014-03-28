// Module for using Harmonic Product Spectrum to compute the Fundamental Frequency

define([], function HpsModule(){

	var sampleRate, size,
        sampleSize = 5;

	function hps(data, sampleRate, size){
        var samples = [],
            i, l,
            results = [],
            peaks = [];

        for(i= 0; i<samples; i++){
            samples[i] = downsample(data, i+1);
        }

        results = [];
        for(i= 0, l=samples[sampleSize-1].length; i<l; i++){
            results.push(calculateProduct(samples, i));
        }

        peaks = getPeaks(results);

        return getFrequencyForBin(peaks[0]);
	}

    function calculateProduct(samples, index){
        return samplesCopy.reduce(function(previous, current){
            return previous[index] * current[index];
        }, 1);
    }

	function getPeaks(data){
		var peaks = [],
			nextValue,
			lastValue = 0,
            i, l;

		for(i=0, l=data.length; i<l; i++){
			nextValue = i + 1 === data.length ? 0 : data[i+1];
            if(data[i] > nextValue && data[i] > lastValue){
                peaks.push(getFrequencyForBin(i));
            }
            lastValue = data[i];
		}
		return peaks;
	}

    function downsample(data, ratio){
        var size = Math.ceil(data.length / ratio),
            newData = new Uint8Array(size),
            i, l, index;

        for(i= 0, l=data.length, index = 0; i<l ; i = i + ratio, index++){
            if(index < size){
                newData[index] = data[i];
            }
        }

        return newData;
    }

	function getFrequencyForBin(index){
		return index * sampleRate / size;
	}

    return{
        getFrequencyForBin : getFrequencyForBin,
        downsample : downsample,
        getPeaks : getPeaks,
        doHps : hps
    }

});