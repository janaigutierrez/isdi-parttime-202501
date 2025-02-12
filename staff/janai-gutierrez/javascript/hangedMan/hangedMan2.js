//declared variables:

var word = 'peperoni'
var lives = 3
var guessedWord = hiddenWord(word.length);

//declared functions:

//checks if a letter is in a word

function letterInWord(letter, word) {
        for(var i = 0; i < word.length; i++) {
        if(word[i] === letter) {
            return true;
        }
    }
return false;
}

//creates an string made of '-' same length as word

function hiddenWord(length) {
    var hidden = '';
    for (var i = 0; i < length; i++) {
                   hidden += '-';
        }
    
    return hidden;
}

//adds the checked letter to the string

function revealLetter(letter, word, guessedWord) {
    var newGuessedWord = '';
    for(var i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            newGuessedWord += letter;
        } else {
            newGuessedWord += guessedWord[i];
        }
    }
    return newGuessedWord;
}

//turns upper case to lower case manually

function toLowerCase(letter) {
    var upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var lowerCase = 'abcdefghijklmnopqrstuvwxyz'

    for(var i = 0; i < upperCase.length; i++) {
        if(letter === upperCase[i]) {
            return lowerCase[i];
        }
    }
    return letter;
}

//main game code

while (guessedWord !== word && lives > 0) {
    var guessedLetter = prompt(`That is what you find out: \n${guessedWord} \nYou have ${lives} lives left`);

    if(guessedLetter === null) {
        lives = 0;
        alert('Leaving the game');
        break;
    }
    if (guessedLetter === '' || guessedLetter.length > 1) {
        alert('Just letter please')
        continue;
    }

    guessedLetter = toLowerCase(guessedLetter); //this turns guessedLetter into lower case

    if(letterInWord(guessedLetter, word)) {
        guessedWord = revealLetter(guessedLetter, word, guessedWord);
    } else {
        lives--;
        alert(`BEEP! Wrong answer. \nJust ${lives} lives left.`)
    }

}

//results


if (guessedWord === word) {
    alert(`You won, well done! \nThe word was ${word}`);
} else {
    alert(`You lost... \nThe word was ${word}`);
}