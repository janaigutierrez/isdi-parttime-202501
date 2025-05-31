//Método Map//
//El método map permite iterar todos los elementos de un array, aplicando en cada uno de los elementos un callback,
//y devolviendo todos los elementos con el callback aplicado a un nuevo array//

let names = ['Juan', 'Diana', 'Sonia', 'Marta'] 
let testNames = ['Juan', 'Diana', 'Sonia', 'Marta'] 

const myMap = (array, callback) => { 
    const mappedArray = [] 
    for (let i = 0; i < array.length; i++) { 
        mappedArray.push(callback(array[i])) 
    }
    return mappedArray
}

const controlResult1 = testNames.map(name => name.toUpperCase())
const controlResult2 = myMap(names, (name => name.toUpperCase())) 


const comparingArrays = (array1, array2) => { 
    if (array1.length !== array2.length) return false 
    for (var i = 0; i < array1.length; i++) { 
        if (array1[i] !== array2[i]) return false;
    }
    return true 
}

console.assert(comparingArrays(controlResult1, controlResult2), 'ambos controles devuelven lo mismo. El código es correcto')