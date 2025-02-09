// Array.includes() - determines whether an array includes or not a certain value

const array1 = [1, 2, 3];
checkedNumber = 2
console.log(array1.includes(2));

function myIncludes(array1, checkedNumber) {
    for(i = 0; i < array1.length; i++) {
        if (array1[i] === checkedNumber) {
            return true;
        }
    }
    return false;
}

console.log(myIncludes(array1, checkedNumber));