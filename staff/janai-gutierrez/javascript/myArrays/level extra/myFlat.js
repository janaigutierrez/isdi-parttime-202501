//myFlat - rearranges subdivisions of array into a new simple array

var names = ['Juan', ['Francisco', 'Loli', ['Dante', 'Germán']], 'Diana', ['Gonzalo', 'Angel', ['María', 'David']], 'Sonia', ['Lidia', 'Tere', ['Amira', 'Telma']], 'Marta'];

function myFlat(array, deepIndex = 1) {
    var resultArray = []; 
    var doesArrayStillHaveNestedArrays = false;

    for (var i = 0; i < array.length; i++) {
        if (array[i].constructor !== Array) {
                resultArray[resultArray.length] = array[i];
        } else {
            for (var j = 0; j < array[i].length; j++) {
                resultArray[resultArray.length] = array[i][j];
                if (array[i][j].constructor === Array) {
                    doesArrayStillHaveNestedArrays = true;
                }
                     resultArray[resultArray.length] = array[i][j];
                };
            }
        }
        if ((deepIndex !== Infinity && deepIndex > 0) || (deepIndex === Infinity && doesArrayStillHaveNestedArrays)) {
            return myFlat(resultArray, deepIndex)
        } else {
            return resultArray;
        }
}

console.info('tests with deepIndex === 2')
var arrayControl = ['Juan', ['Francisco', 'Loli', ['Dante', 'Germán']], 'Diana', ['Gonzalo', 'Angel', ['María', 'David']], 'Sonia', ['Lidia', 'Tere', ['Amira', 'Telma']], 'Marta'];
var arrayTest = ['Juan', ['Francisco', 'Loli', ['Dante', 'Germán']], 'Diana', ['Gonzalo', 'Angel', ['María', 'David']], 'Sonia', ['Lidia', 'Tere', ['Amira', 'Telma']], 'Marta'];

