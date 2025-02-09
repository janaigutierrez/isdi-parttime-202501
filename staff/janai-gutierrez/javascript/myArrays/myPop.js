//Array.pop() - deletes the last index of the array

            const fruits = ['pear', 'apple', 'orange', 'watermelon', 'kiwi'];
            var deletedFruit = 'kiwi'

            console.log(fruits.pop());
           
            function myPop(fruites, deletedFruit) {
                fruits[fruits.length--] 
                return fruits;
            }
            
            console.log(myPop(fruits, deletedFruit))
            console.log(fruits)