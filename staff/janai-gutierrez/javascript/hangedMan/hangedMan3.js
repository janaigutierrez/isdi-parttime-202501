//global variables

var word = 'peperoni';
var lives = 5;
var guessedWord = '-'.repeat(word.lenght);

//creating HTML elements

var body = document.body;

// Títol del joc
var gameTitle = document.createElement('h1');
gameTitle.textContent = 'THE HANGMAN GAME';
gameTitle.style.textAlign = 'center';

// Contenidor de la paraula oculta
var wordContainer = document.createElement('div');
wordContainer.style.fontSize = '2rem';
wordContainer.style.letterSpacing = '0.5rem';
wordContainer.style.marginBottom = '1rem';

//lives container
var livesContainer = document.createElement('p');
livesContainer.style.fontWeight = 'bold';

var messageContainer = document.createElement('p');

var letterForm = document.createElement('form');
var letterInput = document.createElement('input');
var submitButton = document.createElement('input');

//styles

wordContainer.style.fontSize = '2rem';
wordContainer.style.letterSpacing = '0.5rem';
livesContainer.style.fontWeight = 'bold';

letterInput.type = 'text';
letterInput.maxLength = 1;
letterInput.required = true;
submitButton.type = 'submit';
submitButton.value = 'try';

//adding elements to doc

letterForm.appendChild(letterInput);
letterForm.appendChild(submitButton);

body.appendChild(wordContainer);
body.appendChild(livesContainer);
body.appendChild(messageContainer);
body.appendChild(letterForm);

//function to refresh interface

function updateInterface() {
    wordContainer.textContent = guessedWord.split('').join(' ');
    livesContainer.textContent = `Lives: ${lives}`;
}

//function to check letters

function checkLetter(letter) {
    if(word.includes(letter)) {
        guessedWord = guessedWord.split('').map((c, i) => (word[i] ===letter ? letter : c)).join('');
    } else {
        lives--;
    }
    updateInterface();
}

//checking user submit

letterForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var guessedLetter = letterInput.value.toLocaleLowerCase();
    letterInput.value = '';

    if (guessedLetter.length !== 1) return;

    checkLetter(guessedLetter);

    if(guessedWord === word) {
        messageContainer.textContent = `🎉 You won! The word was ${word}`;
        letterForm.remove();
        } else if (lives === 0) {
            messageContainer.textContent = `💀 You lost... The word was ${word}`;
            letterForm.remove();

        }
})

updateInterface();