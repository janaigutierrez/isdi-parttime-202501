    //Every - checks wether all elements in the array pass the test implemented by a function and returns a boolean

    const names = ['Mike', 'John', 'James', 'Olivia', 'Max'];

    
    const myEvery = (array, callback) => {
        for (let i = 0; i < array.length; i++) {
            if(!callback(array[i], i, array)) {
                return false;
            }
        }
        return true;
    }


    const controlResult1 = names.every(name => name.length > 3);
    const controlResult2 = myEvery(names, name => name.length > 3);

    console.assert(controlResult1 === controlResult2, `Error, los arrays no devuelven lo mismo`)