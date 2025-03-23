//Método Filter//

let names = ['Juan', 'Diana', 'Sonia', 'Marta'] 
let testNames = ['Juan', 'Diana', 'Sonia', 'Marta'] 

const myFilter = (array, callback) => { 
    const filteredArray = [] 
    for (let i = 0; i < array.length; i++) { 
        if (callback(array[i], i, array)) { 
            filteredArray.push(array[i]) 
        }
    }
    return filteredArray 
}


const controlResult1 = testNames.filter(name => name.length > 4)

const controlResult2 = myFilter(names, (name) => { 
})

console.assert(controlResult1 === controlResult2, 'ambos controles devuelven lo mismo. El código es correcto')

for (let i = 0; i < controlResult1.length; i++) { 
    console.assert(controlResult1[i] === controlResult2[i], `la posición ${i} es diferente en ambos arrays. ${testNames[i]} !== ${names[i]}`); 
}