    //Every - rests wether all elements in the array pass the test implemented by a function and returns a boolean

    const isBelowThreshold = (currentValue) => currentValue < 40;
    const controlArray = [1, 30, 39, 29, 10, 13];

    console.log(controlArray.every(isBelowThreshold)); //expected output: true;

    