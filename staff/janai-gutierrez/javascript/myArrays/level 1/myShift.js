//Array.shift() - deletes the first index of the array and returns it
var controlArray = ['Blue', 'Yellow', 'Red'];
var testArray = ['Blue', 'Yellow', 'Red'];
var controlElement;
var testElement;
//native way
controlElement = controlArray.shift()
console.log(controlArray)
//my way
function myShift(array) {
   var deletedElement = array[0];
   for(var i = 0; i < array.length; i++){
      array[i] = array[i+1]; //moves elements to the left
   }
   array.length = array.length - 1; //shortens it to the left
   return deletedElement;
}
testElement = myShift(testArray);
console.log(testArray);
console.log(testElement);
//testing
console.log('testing...');
//testing deleted element
console.assert(controlElement === testElement, `Error: deleted elements are not the same ${controlElement} !== ${testElement}`);
//testing length
console.assert(controlArray.length === testArray.length, `Error: expected length was ${controlArray.length} but got ${testArray.length} instead.`);
//testing indexes
for(var i = 0; i < controlArray.length; i++){
   console.assert(controlArray[i] === testArray[i], `Error on index ${[i]}: expected ${controlArray[i]} but got ${testArray[i]}`);
}
//testing if undefined
console.assert([].shift() === myShift([]), `should return undefined but returns; ${myShift([])}`);