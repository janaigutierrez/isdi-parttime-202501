// Array.join() - creates a new STRING bby concatenating all of the elements in this array, separated by commas or the specified separator string

const names = ['John', 'Erik', 'Jessica'];

console.log(names);
console.log(names.join());
console.log(names.join(''));
console.log(names.join('-'));

function myJoin(names, separator = ',') {
        joinedNames = '';
        for (i = 0; i< names.length; i++) {
            joinedNames += names[i];

            if(i < names.length - 1) {
                joinedNames += separator
            }
        }

        return names;
}

console.log(names)
console.log(myJoin(names, ''))