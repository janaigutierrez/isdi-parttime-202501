//Método Find//
//El metodo find itera los elementos de un array y pasa un callback. El primer elemento iterado que cumpla la función del callback, será devuelto. Si no cumple ningún elemento con el callback, devolvería undefined//

let names = ['Juan', 'Diana', 'Sonia', 'Marta'] 
let testNames = ['Juan', 'Diana', 'Sonia', 'Marta'] 

const myFind = (array, callback) => { 
    for (let i = 0; i < array.length; i++) { 
        if (callback(array[i], i, array)) {
            return array[i] 
        }
    }
    return undefined 
}

const controlResult1 = testNames.find((name) => { 
    return name.startsWith('S')
})
const controlResult2 = myFind(names, (name) => { 
    return name.startsWith('S')
})

console.assert(controlResult1 === controlResult2, 'ambos controles devuelven lo mismo. El código es correcto')

for (let i = 0; i < controlResult1.length; i++) { 
    console.assert(controlResult1[i] === controlResult2[i], `la posición ${i} es diferente en ambos arrays. ${testNames[i]} !== ${names[i]}`); 
}
