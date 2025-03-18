    //forEach - executes a provided function once for each array element

    const array = ['a', 'b', 'c'];
    array.forEach((element) => console.log(element)); 
    //expected output: 'a';
    //expected output: 'b';
    //expected output: 'c';

    function myForEach(array) {
        for(var i = 0; i < array.length; i++) {
            console.log(i);
        }
    }