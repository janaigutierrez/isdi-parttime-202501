        //array.includes - determines whether an array includes or not a certain value and returns true or false

var controlArray = [1, 2, 3];
var checkedNumber = 2;
var testArray = [1, 2, 3];

            //array method

var controlResult = controlArray.includes(2);

            //my method

function myIncludes(array, checkedNumber) {
    for(i = 0; i < array.length; i++) {
        if (array[i] === checkedNumber) {
            return true;
        }
    }
    return false;
};

var testResult = myIncludes(testArray, checkedNumber);

        //testing

console.log('testing');

console.assert(controlResult === testResult, `Error: ${checkedNumber} does not appear in testArray.`);