/**
 * Created by paul.wilson on 28/03/14.
 */

describe("HPS", function(){

    var hps;

    beforeEach(function(){
       hps = window.Modules.HpsModule();
    });

    it("Can load the module", function(){
       expect(hps).toBeTruthy();
    });

    it("Can correctly downsample a byte array by a factor of 2", function(){
        var data = generateByteArray(10);
        var result = hps.downsample(data, 2);

        expect(result.length).toBe(5);
        expect(result[0]).toEqual(data[0]);
        expect(result[1]).toEqual(data[2]);
        expect(result[2]).toEqual(data[4]);
        expect(result[3]).toEqual(data[6]);
        expect(result[4]).toEqual(data[8]);
    });

    it("Can correctly downsample a byte array by a factor of 3", function(){
        var data = generateByteArray(10);
        var result = hps.downsample(data, 3);

        expect(result.length).toBe(4);
        expect(result[0]).toEqual(data[0]);
        expect(result[1]).toEqual(data[3]);
        expect(result[2]).toEqual(data[6]);
        expect(result[3]).toEqual(data[9]);
    });

});