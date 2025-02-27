// My slice
//return a shallow copy of a portion of an array into a new array object from start to end (end not included) where start and end represent the index of items in the array. 
//original array not modified
debugger
var controlArray = ['perro', 'gato', 'pez', 'conejo', 'vaca', 'oveja'];
var testArray = ['perro', 'gato', 'pez', 'conejo', 'vaca', 'oveja'];

console.log(controlArray);
console.log(controlArray.slice(2));

//expected output: ['pez', 'conejo', 'vaca', 'oveja']

function mySlice (array, j) {
    for(var i = j; i < array.length; i++){
        array[i - j] = array[i] //no sabemos como indicar el indice :S
    }
    array.length = array.length - j;
    return array;
}

console.log(testArray)
console.log(mySlice(testArray, 2))

console.assert(controlArray === testArray, `Error: los arrays devueltos no son iguales`);
console.assert(controlArray.slice(2) === mySlice(testArray, 2), `Error: la shallow copy no coincide`);