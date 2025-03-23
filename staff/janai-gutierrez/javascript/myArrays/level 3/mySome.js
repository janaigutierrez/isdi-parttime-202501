// some - instances tests wether at least one element in the array passes the test implemented

let names = ['Juan', 'Diana', 'Sonia', 'Marta'] 
let testNames = ['Juan', 'Diana', 'Sonia', 'Marta'] 

const mySome = (array, callback) => { 
    for (let i = 0; i < array.length; i++) { 
        if (callback(array[i], i, array)) { 
            return true;
        }
    }
    return false;
}

const controlResult1 = testNames.some((name) => { 
    return name.startsWith('S')
})
const controlResult2 = mySome(names, (name) => { 
    return name.startsWith('S')
})


console.assert(controlResult1 === controlResult2, 'Error: los controles no coinciden')

for (let i = 0; i < controlResult1.length; i++) { 
    console.assert(controlResult1[i] === controlResult2[i], `la posición ${i} es diferente en ambos arrays. ${testNames[i]} !== ${names[i]}`); 
}