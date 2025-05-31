//Array.push() - adds something at the end of the array

var controlArray = ['James', 'Adams', 'Stuart'];
var controlElement = 'Melany';
var testArray = ['James', 'Adams', 'Stuart'];
var testElement = 'Melany';
//native way
controlArray.push(controlElement);
console.log(controlArray);
//my way
function myPush(array, element) {
    array[array.length] = element;
    return array;
}
myPush(testArray, testElement);
console.log(testArray);
//testing
console.log('testing...');
//testing indexes
for(var i = 0; i < controlArray.length; i++) {
    console.assert(controlArray[i] === testArray[i], `Error at index ${i}: ${testArray[i]} !== ${controlArray[i]}.`);
    };
//testing length(idk if necessary if already checked indexes)
console.assert(controlArray.length === testArray.length, `Error: arrays length do not match. expected ${controlArray.length} length but got ${testArray.length} length.`);