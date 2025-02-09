 //Array.shift() - deletes the first index of the array

        var colors = ['blue', 'black', 'yellow', 'red']
        var deletedColor = colors.shift();

        console.log(colors)
        console.log(deletedColor) 

        function myShift(colors) {
           var deletedColor = color[0]
           for(i = 0; i < colors.length; i++) {
            colors[i] = colors[i + 1];
           }
           colors.length = colors.length - 1;
           
        }
        console.log(deletedColor)
        console.log(colors)