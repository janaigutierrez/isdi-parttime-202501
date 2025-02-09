//Array.push() - adds something at the end of the string


            const animals = ['gat', 'gos', 'conill'];
            var thingToPush = 'cocodril'
            
            function myPush(animals, thingToPush) {
                animals[animals.length] = thingToPush;
                return thingToPush
            }
            console.log(myPush(animals, thingToPush))
            console.log(animals)