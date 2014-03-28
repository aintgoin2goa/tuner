/**
 * Created by paul.wilson on 28/03/14.
 */

function random(min, max){
    return min + Math.floor(Math.random() * (max - min + 1));
}

function generateByteArray(size){
    var arr = new Uint8Array(size);
    for(var i=0; i< size; i++){
        arr[i] = random(0,255);
    }
    return arr;
}
