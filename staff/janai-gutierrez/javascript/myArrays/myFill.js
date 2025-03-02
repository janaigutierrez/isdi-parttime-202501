//Array.fill - changes all elements within a range of indices in an array to a static value. returns the modified array

var controlArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(controlArray.fill(0, 5, 9));

function myFill(array, num, [i], [j]) {
    for(var l = i; l <= j; i++)
        array[l] = num
    return array;
};

console.log(myFill(testArray, 0, [5], [9]));

console.log('testing');

console.assert(controlArray.fill(0, 5, 9) === myFill, `Error: the returned arrays do not coincide`);