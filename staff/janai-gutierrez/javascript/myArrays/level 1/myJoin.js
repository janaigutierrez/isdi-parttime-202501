        //array.join - creates a new STRING bby concatenating all of the elements in this array, separated by commas or the specified separator string

var controlArray = ['John', 'Erik', 'Jessica'];
var testArray = ['John', 'Erik', 'Jessica'];

        //array method

var controlResult = controlArray.join('');

        //my method

function myJoin(array, separator = ',') {
        joinedArray = '';
        for (i = 0; i< array.length; i++) {
            joinedArray += array[i];

            if(i < array.length - 1) {
                joinedArray += separator
            }
        }

        return array;
}

var testResult = myJoin(testArray, ',');

        //testing
    
console.log('testing');

console.assert(controlResult === testResult, `Error: test and control string are not the same.`)
