//como predefinir una funcion en el marco global sin que interactue con el codigo??????????? es realmente util?????

debugger
var word = "mudkip";
var lives = 5;
var guessedWord = '';
var guessedWordArray = [];
var alphabet = 'abcdefghijklmnopqrstuvwxyz';
var alphabetUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

guessedWordToString()                                    // podria colocarse aqui directamente la funcion?????????

for ( i = 0; i < word.length; i++) {                           //nos genera la palabra en guiones y/o espacios
    if(word[i] === '') {
        guessedWordArray[guessedWordArray.lenght] === ''
    } else { 
        guessedWordArray[guessedWordArray.length] === '-'
    }
}

function validateInputLetter(letter) {                        //nos comprueba que el input sea una sola letra
    if (letter.lenght !== 1 || letter == '') {
        alert('Just letters sir')
        return
    }

    for (i = 0; i < alphabet.lenght; i++) {                    //nos devuelve siempre la letra minúscula del input
        if(letter === alphabet[i] || letter === alphabetUpper[i]) {
            return(alphabet[i]);
        }
    }
        return;
}
function checkLetterIncluded(letter) {                        
    isLetterInWord = false
    for( i = 0; i < word; i++) {
        if (letter === word[i]) {
            isLetterInWord = true
            guessedWordArray[i] = letter
        }

       }
        if (isLetterInWord = false) {
        lives--
       }
}

function guessedWordToString() {                             //nos pasa el array a string 
    guessedWord = ''
    for (var i = 0; i < guessedWordArray.length; i++) {
        guessedWord += guessedWordArray[i]
    }
}

//aqui empieza el juego

alert('Welcome to Hangman the Game')

while (guessedWord !== word && lifes !== 0) {
    var guessedLetter = prompt(`Thats what you found out: \n${guessedWord} \nYou have ${lives} lifes left `)
    if (guessedLetter === null) {
        lives = 0
        alert('Leaving the game')
    } else {
        var validatedLetter = validateInputLetter(guessedLetter)
        if(validatedLetter !== undefined) {
            checkLetterIncluded(validatedLetter)
            guessedWordToString()                              // actualiza el string para asegurar que si esta completo no vuelva a entrar en bucle
        }
    }
}

if (lifes === 0) {
    alert('You lost, try again?')
}

if (guessedWord === word) {
    alert(`Well done! You won! \n The word was: ${word}.`)
}