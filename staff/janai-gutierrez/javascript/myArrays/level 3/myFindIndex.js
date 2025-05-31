//FillIndex - returns the index of the first ekement in the array that satisfies the provided testing function

var testArray = [4, 13, 8, 55, 200, 22];
var controlArray = [4, 13, 8, 55, 200, 22];

var controlElement = (element) => element > 13;

console.log(controlArray.findIndex(controlElement));

//expected output: 3

function myFillIndex(){


}

//testing
console.log(testing);

console.assert();




//Método FindIndex//
//El metodo findIndex itera los elementos de un array y pasa un callback. El índice del primer elemento iterado que cumpla la función del callback, será devuelto. Si no cumple ningún elemento con el callback, devolvería -1 (índice inexistente)//


let names = ['Juan', 'Diana', 'Sonia', 'Marta'] //Declaramos variable con array original//
let testNames = ['Juan', 'Diana', 'Sonia', 'Marta'] //Declaramos variable de test con los elementos del array original//
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS UNA FUNCIÓN QUE REALIZARÍA, DE MANERA MANUAL, EL MÉTODO FIND//
const myFindIndex = (array, callback) => { //La función permitiría realizar un findIndex sobre un array, aplicando un callback sobre cada elemento de ese array, para comprobar si alguno de ellos cumple con el//
    for (let i = 0; i < array.length; i++) { //El for itera sobre cada elemento del array//
        if (callback(array[i], i, array)) { //El if nos indica que si algún elmento pasa el callback//
            return i //Devolvemos el índice que ha cumplido el callback//
        }
    }
    return -1 //Si no hay ningún elemento que pase el callback, devolvemos -1//
}

//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES DE CONTROL PARA REALIZAR LAS COMPROBACIONES//
const controlResult1 = testNames.findIndex((name) => { //Declaramos la primera variable de control, donde aplicaremos el findIndex sobre el array original, con el callback a ejecutar (en este caso, devolver si algún elemento empieza por la letra 'S'. Devolvería 2, ya que es el índice de Sonia (el primer elemento del array que empieza por 'S')//
    return name.startsWith('S')
})
const controlResult2 = myFindIndex(names, (name) => { //Declaramos la segunda variable de control, donde aplicaremos el findIndex sobre el array original, con el callback a ejecutar (en este caso, devolver si algún elemento empieza por la letra 'S'). Devolvería 2, ya que es el índice de Sonia (el primer elemento del array que empieza por 'S')//
    return name.startsWith('S')
})
//***************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//VALIÉNDONOS DE LA FUNCION CONSOLE.ASSERT, REALIZAMOS POR DOS VÍAS LAS COMPROBACIONES PERTINENTES, PARA AVERIGUAR SI AMBOS TEST SON SUPERADOS, O SI POR CONTRA, DEBEMOS MODIFICARLOS//
console.assert(controlResult1 === controlResult2, 'ambos controles devuelven lo mismo. El código es correcto')

for (let i = 0; i < controlResult1.length; i++) { //El for itera todos los elementos de la longitud de controlResult1//
    console.assert(controlResult1[i] === controlResult2[i], `la posición ${i} es diferente en ambos arrays. ${testNames[i]} !== ${names[i]}`); //Con este assert comprobamos los índices de controlResult1 y de controlResult2. Si son iguales, no lanzará ningún mensaje, pero si hay diferencias en algúna posición, las arrojaría en el mensaje escrito en consola//
}