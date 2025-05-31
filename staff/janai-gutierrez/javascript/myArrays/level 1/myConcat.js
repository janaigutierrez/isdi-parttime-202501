        //array.concat - returns a new array merging two or more
        
var controlArray1 = ['Juan', 'Diana', 'Sonia', 'Marta'] 
var controlArray2 = ['Juanjo', 'Francisco', 'David', 'Marco']
var testArray1 = ['Juan', 'Diana', 'Sonia', 'Marta'] 
var testArray2 = ['Juanjo', 'Francisco', 'David', 'Marco'] 

        //concat method

var controlArrayResult = controlArray1.concat(controlArray2);
console.log(controlArrayResult);

        //my method

function myConcat(array1, array2) {
    if (array1.length === 0 && array2.length === 0) return undefined //returns undefined if array.length === 0
    var concat = []  
    for (var i = 0; i < array1.length; i++) {
        concat[concat.length] = array1[i] 
    }
    for (var j = 0; j < array2.length; j++) {
        concat[concat.length] = array2[j] 
    }
    return concat;
};
var testArrayResult = myConcat(testArray1, testArray2);

        //testing

console.log('Testing');

for(var i = 0; i <= controlArrayResult.length; i++) {
    console.assert(controlArrayResult[i] === testArrayResult[i], `Error: control array and test array are not the same.`);
};
