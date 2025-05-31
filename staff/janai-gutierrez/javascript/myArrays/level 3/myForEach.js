//El método forEach permite aplicar un callback sobre cada elemento de un array.//

let names = ['Juan', 'Diana', 'Sonia', 'Marta'] 
let testNames = ['Juan', 'Diana', 'Sonia', 'Marta'] 

const myForEach = (array, callback) => { 
    for (let i = 0; i < array.length; i++) { 
        callback(array[i], i, array) 
    }
}

const controlResult1 = testNames.forEach((name, index, array) => { 
    console.log(`Name: ${name}, Index: ${index}, Array: ${array}`)
})
const controlResult2 = myForEach(names, (name, index, array) => { 
    console.log(`Name: ${name}, Index: ${index}, Array: ${array}`)
})

console.assert(controlResult1 === controlResult2, 'Error: los controles no coinciden')

for (let i = 0; i < controlResult1.length; i++) { 
    console.assert(controlResult1[i] === controlResult2[i], `la posición ${i} es diferente en ambos arrays. ${testNames[i]} !== ${names[i]}`); 
}
