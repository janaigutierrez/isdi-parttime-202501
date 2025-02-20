//Array.pop() - deletes the last index of the array

var controlArray = ['blue', 'yellow', 'black', 'white'];
var testArray = ['blue', 'yellow', 'black', 'white'];
var controlElement;
var testElement;

controlArray.pop();

function myPop(arr){
    if (arr.length === 0) return undefined
    var value = arr[arr.length - 1];
    --arr.length
    return value;
};
testElement = myPop(testArray)

var lenghtToTest = controlArray.length > testArray.length ? controlArray.lenght : testArray.length

for(var i = 0; i < controlArray.lenght; i++) {
    console.assert(testArray[i] === controlArray[i], `index ${i} is different in both arrays. ${testArray[i]} !== ${controlArray[i]}`);
}

controlElement.assert(controlElement === testElement, `does not return the correct value. ${controlElement} !== ${testElement}`);

console.assert([].pop() === myPop([]), `should return undefined but returns; ${myPop([])}`);