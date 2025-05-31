//Array.unshift() - adds something to the first index of the array and returns new length
var controlArray = ['Peach', 'Apple', 'Watermelon'];
var controlElement = 'Orange';
var testArray = ['Peach', 'Apple', 'Watermelon']
var testElement = 'Orange';
var lenghtNumber
//native way
var controlLength = controlArray.unshift(controlElement);
console.log("Control array (after unshift):", controlArray);
//my way
function myUnShift(array, element) {
    for(var i = array.length; i > 0; i--) {
        array[i] = array[i - 1];
    }
    array[0] = element
    return array.length;
}
var testLength = myUnShift(testArray, testElement)
console.log("Test array (after myUnShift):", testArray);
console.log("Returned length:", testLength);
//testing
console.log('Testing...');
//testing length
console.assert(controlLength === testLength, `Error: expected length was ${controlLength} but got ${testLength} instead.`);
//testing indexes
if(controlArray.length === testArray.length) {
    for(var i = 0; i < controlArray.length; i++) {
    console.assert(controlArray[i] === testArray[i], `Error at ${i}: ${controlArray[i]} !== ${testArray[i]}.`);
    }
}