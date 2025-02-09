//Array.concat() - adds an array next to the first one

var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
var arr3 = arr1.concat(arr2);

console.log(arr3)

function myConcat(arr1, arr2) {
    arr3 = arr1 + arr2
    return arr3;

}

console.log(arr3)