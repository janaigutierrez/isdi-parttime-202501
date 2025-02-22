//Array.unshift() - adds something to the first index of the array and returns new length
var controlArray = ['Peach', 'Apple', 'Watermelon'];
var controlElement = 'Orange';
var testArray = ['Peach', 'Apple', 'Watermelon']
var testElement = 'Orange';
var lenghtNumber
//native way
console.log(controlArray.unshift(controlElement));
console.log(controlArray);
//my way
function myUnShift(array, element) {
    for(var i = array.length; i > 0; i--) {
        array[i] = array[i-1];
        };
    array[0] = element

    return array;    
}
console.log(testArray.length);
console.log(myUnShift(testArray, testElement));
//testing
//testing length
console.assert(controlArray.length === testArray.length, `Error: expected ${controlArray.length} but got ${testArray.length} instead.`);
//testing indexes
for(var i = 0; i < controlArray.length; i++) {
    console.assert(controlArray[i] === testArray[i], `Error at ${i}: ${controlArray[i]} !== ${testArray}.`);
};
//Testing length number (smt's wrong)
console.assert(controlArray.unshift(controlElement) === console.log(testArray.length));