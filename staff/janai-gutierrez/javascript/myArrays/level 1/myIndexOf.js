        //array.indexOf - returns the first index ar which a given element can be found, -1 if can't be found

var controlArray = [1, 2, 3];
var checkedIndex = 3;
var testArray = [1, 2, 3];
        
        //array method
        
var controlResult = controlArray.indexOf('3');
        
        //my method
        
function myIndexOf(array, checkedIndex) {
    if (array.length === 0) {
         return undefined;
    }
    for(i = 0; i < array.length; i++) {
        if (array[i] === checkedIndex) {
             return array[i];
         } else {
             return -1;
         };
     };
   };
        
var testResult = myIndexOf(testArray, checkedIndex);
        
        //testing
        
console.log('testing');
        
console.assert(controlResult === testResult, `Error: ${checkedIndex} does not appear in testArray.`);