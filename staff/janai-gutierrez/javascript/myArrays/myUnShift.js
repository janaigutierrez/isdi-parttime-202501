//Array.unshift() - adds something to the first index of the array

var numbers = [1, 2, 3, 4, 5]
var addedNumbers = numbers.unshift(6);

console.log(numbers)
console.log(addedNumbers)

function myUnShift(numbers) {
    addedNumbers = numbers[0]
    return numbers;
}

console.log(numbers)
console.log(addedNumbers)