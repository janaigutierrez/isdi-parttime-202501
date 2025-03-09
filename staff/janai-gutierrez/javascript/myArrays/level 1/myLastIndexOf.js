//array.lastIndexOf - returns the last index ar which a given element can be found, -1 if can't be found

var controlArray = [1, 2, 3];
var checkedIndex = 3;
var testArray = [1, 2, 3];
        
        //array method
        
var controlResult = controlArray.lastIndexOf('3');
        
        //my method
        
function myLastIndexOf(array, checkedIndex) {
    if (array.length === 0) {
         return undefined;
    }
    for(var i = array.length - 1; i >= 0; i--) {
        if (array[i] === checkedIndex) {
             return array[i];
         } else {
             return -1;
         };
      };
   };
        
var testResult = myLastIndexOf(testArray, checkedIndex);
        
        //testing
        
console.log('testing');
        
console.assert(controlResult === testResult, `Error: ${checkedIndex} does not appear in testArray.`);