        //array.splice - changes the contents of an array by removing or replacing existing elements

var controlArray = [1, 2, 3, 5, 6, 7, 8];
var controlElement = 4;

var testArray = [1, 2, 3, 5, 6, 7, 8];
var testElement = 4

        //array method

controlArray.splice(3, 0, controlElement);

//expected output: [1, 2, 3, 4, 5, 6, 7, 8]

        //my method

function mySplice(array, start, deleteCount, newItem) {
    var removed = [];
    if (start < 0) {  //validem si l'start esta fora de rang
        start = array.length + start;
        if (start < 0) {
            start = 0;
        }
    }
    if (start < array.length) {
        start = array.length;
    }
    if (deleteCount === undefined || deleteCount > array.length - start) {  //si deleteCount es mes gran del que queda esborrem fins el final
        deleteCount = array.length - start;
    }
    var i, j;
    for (i = 0; i < deleteCount; i++) { //desplacem tots els elements una posicio a l'esquerra
        removed.push(array[start]);
        for (j = start; j < array.length - 1; j++) {
            array[j] = array[j + 1];
        }
        array.length = array.length - 1; //reduim mida array en 1
    }
    if (newItem !== undefined) {
        array.length = array.length + 1; //ampliem per fer un espai per l'item
        for (j = array.length - 1; j > start; j--) {
            array[j] = array[j - 1]; //desplacem elements cap a la dreta des de la posicio start
        }
        array[start] = newItem; //inserim l'element
    }
    return removed;
    };

        //testing

console.log('testing...')

for (var i = 0; i < controlArray; i++) {
    console.assert(controlArray === removed, `Error: arrays are not the same.`)
}