        //array.fill - changes all elements within a range of indices in an array to a static value. returns the modified array

var controlArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        //array method

var controlResult = controlArray.fill(0, 5, 9);

        //my method

function myFill(array, num, i, j) {
    for(var l = i; l < j; l++) {
        array[l] = num;
    }
    return array;
};

var testResult = myFill(testArray, 0, [5], [9]);

        //testing

console.log('testing');

for(var i = 0; i < controlResult.length; i++) {
    console.assert(controlResult[i] === testResult[i], `Error: control and test results are not the same`);
};