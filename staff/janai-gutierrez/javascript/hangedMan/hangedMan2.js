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

//starting render
var body = document.body;
var wordContainer;
var livesContainer;
var letterFormContainer;

//body area
body.style.display = 'flex';
body.style.flexDirection = 'column';
body.style.gap = '2rem';

//title in body area
var gameTitle = document.createElement('h1');
gameTitle.textContent = 'THE HANGMAN GAME';
gameTitle.style.textAlign = 'center';

body.appendChild(gameTitle);


function renderInterface() {
    
    wordContainer = document.createElement('div');
    wordContainer.style.width = '100%';
    wordContainer.style.display = 'flex';
    wordContainer.style.flexDirection = 'row';
    wordContainer.style.gap = '0.5rem';
    wordContainer.style.justifyContent = 'center';

    for (var i = 0; i <guessedWord.length; i++) {
        var letterSquare = document.createElement('div');
        letterSquare.style.height = "2rem";
        letterSquare.style.width = "2rem";
        letterSquare.style.border = "2px dashed slategray"
        letterSquare.style.display = "flex";
        letterSquare.style.justifyContent = "center";
        letterSquare.style.alignItems = "center";
        if (guessedWord[i] !== '-') {
            var letterContainer = document.createElement('b');
            letterContainer.textContent = guessedWord[i].toUpperCase();
            letterSquare.style.border = '2px solid green'
            letterSquare.style.backgroundColor = 'fuchsia'
            letterSquare.appendChild(letterContainer)

        }
     wordContainer.appendChild(letterSquare)
       
    }

    livesContainer = document.createElement('div');

    livesContainer.style.width = '100%';
    livesContainer.style.display = 'flex';
    livesContainer.style.flexDirection = 'row';
    livesContainer.style.gap = '1rem';
    livesContainer.style.justifyContent = 'center';

    for (var i = 0; i < lives; i++) {
        var liveIcon = document.createElement('div');
        liveIcon.style.width = '1rem';
        liveIcon.style.height = '1rem';
        liveIcon.style.borderRadius = '50%';
        liveIcon.style.backgroundColor = 'red'

        livesContainer.appendChild(liveIcon)
    }

    letterFormContainer = document.createElement('form');

    letterFormContainer.style.display = 'flex';
    letterFormContainer.style.flexDirection = 'row';
    letterFormContainer.style.width = '100%';
    letterFormContainer.style.gap = '0.5rem';
    letterFormContainer.style.justifyContent = 'center';

    var letterInput = document.createElement('input');
    letterInput.type = 'text';
    letterInput.minLength = 1;
    letterInput.maxLength = 1;
    letterInput.required = true;
    letterInput.id = 'letter';
    letterInput.style.width = '2rem'

    var submitButton = document.createElement('input');
    submitButton.type = 'submit';

    letterFormContainer.appendChild(letterInput);
    letterFormContainer.appendChild(submitButton);

    body.appendChild(wordContainer)
    body.appendChild(livesContainer)
    body.appendChild(letterFormContainer)
}

function cleanInterface() {
    body.removeChild(wordContainer);
    body.removeChild(livesContainer)
    body.removeChild(letterFormContainer)
    wordContainer = undefined;
    livesContainer = undefined;
    letterFormContainer = undefined;
}



renderInterface()

addEventListener('submit', function (event) {
    event.preventDefault();
    var letterValue = event.target.letter.value;
    playGame(letterValue)
    
})


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
renderInterface();