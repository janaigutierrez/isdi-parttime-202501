//Método Reduce//
//El metodo reduce permite iterar en todos los elementos de un array, y reducir todos los elementos a un único valor a través de 2 parámetros:
//Un callback que recibe 4 argumentos: acumulador (valor acumulador que se construye con cada iteración), valor actual (valor de cada elemento iterado), 
//indice (es opcional, y marca la posición de cada elemento iterado) y array (el array sobre el que se está haciendo la iteración).
//El segundo parámetro es el valor incial, que se corresponde al valor incial con el que empieza el acumulador. El útil para hacer operaciones matemáticas con números, 
//o para concatenar, contar la longitud, o contar la frecuencia de caracteres en strings de texto.//


let numbers = [15, 30, 60, 120, 240] 
let testNumbers = [15, 30, 60, 120, 240] 

const reductorFuncion = (acumulator, actualValue) => { 
    return acumulator + actualValue
}

const myReduce = (array, initialValue) => { 
    let acumulator 
    if (initialValue !== undefined) { 
        acumulator = initialValue 
    } else { 
        acumulator = array[0]
    }
    const initialIndex = initialValue !== undefined ? 0 : 1 

    for (let i = initialIndex; i < array.length; i++) { 
        acumulator = reductorFuncion(acumulator, array[i]) 
    }

    return acumulator 
}

const controlResult1 = testNumbers.reduce((acumulator, actualValue) => acumulator + actualValue, 0)
const controlResult2 = myReduce(numbers, 0) 

const comparingArrays = (array1, array2) => { 
    if (array1.length !== array2.length) return false 
    for (var i = 0; i < array1.length; i++) { 
        if (array1[i] !== array2[i]) return false; 
    }
    return true 
}

console.assert(comparingArrays(controlResult1, controlResult2), 'ambos controles devuelven lo mismo. El código es correcto')