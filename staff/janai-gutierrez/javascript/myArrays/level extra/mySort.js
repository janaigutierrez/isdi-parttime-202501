//Método Sort//
//El metodo sort permite iterar en todos los elementos de un array, y ordenarlos alfabéticamente si no se comanda una función de comparación. 
//Convierte todos los elementos en strings, independientemente que sean texto o números, por lo que, para poder hacer una ordenación lógica de números
//debe si o si hacerse una función de comparación. Modifica el array original//

let people = [{name: 'Juan', age: 34}, {name: 'Diana', age: 31}, {name: 'Sonia', age: 11}, {name: 'Marta', age: 2}, {name: 'Matusalen', age: 10000000000}] 
let testPeople = [{name: 'Juan', age: 34}, {name: 'Diana', age: 31}, {name: 'Sonia', age: 11}, {name: 'Marta', age: 2}, {name: 'Matusalen', age: 10000000000}] 

const compareByAge = (a, b) => a.age - b.age 

const mySort = (array, compareFunction) => { 
    for (let i = 0; i < array.length - 1; i++) { 
        for (let j = 0; j < array.length - 1 - i; j++) { 
            if (compareFunction(array[j], array[j + 1]) > 0) { 
                const temp = array[j] 
                array[j] = array[j + 1] 
                array[j + 1] = temp 
            }
        }
    }
    return array 
}

const controlResult1 = testPeople.sort((a, b) => a.age - b.age)
const controlResult2 = mySort(people, compareByAge) 

const comparingArrays = (array1, array2) => { 
    if (array1.length !== array2.length) return false 
    for (var i = 0; i < array1.length; i++) { 
        if (array1[i] !== array2[i]) return false; 
    }
    return true 
}

console.assert(comparingArrays(controlResult1, controlResult2), 'ambos controles devuelven lo mismo. El código es correcto') 