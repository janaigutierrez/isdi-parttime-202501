//myReverse - reverses the order of the indexes

var controlArray = [1, 2, 3, 4, 5];
var testArray = [1, 2, 3, 4, 5];
var controlElement;
var testElement;

controlElement = controlArray.reverse();

console.log(controlArray.reverse());

//My function
function myReverse(arr) {
   for(var i = arr.length; i = 0; i--) {
       arr[i] = reversedArr[i]
   }
   return reversedArr; 
}

//testing
console.log('testing');
//testing indexes
for(var i = 0; i < controlArray.length; i++) {
   console.assert(testArray[i] === controlArray[i], `Error: index ${i} is different in both arrays. ${testArray[i]} !== ${controlArray[i]}`);
}
//testing