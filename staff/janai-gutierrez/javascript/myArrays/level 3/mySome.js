    //Some - tests wether at least one element in the array passes the test implemented by the provided function returns a boolean

    const array = [1, 2, 3, 4, 5];

    const even = (element) => element % 2 === 0;
    console.log(array.some(even));
    //expected output: true;

    function mySome(array) {
        for(var i = 0; i < array.length; i++) {
            if(i % 2 === 0){
                return true;
            } else {
                return false;
            }
        }
    };