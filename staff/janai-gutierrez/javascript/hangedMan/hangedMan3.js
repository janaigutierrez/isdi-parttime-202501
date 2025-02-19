var words = ['peperoni', 'basilico', 'pomodoro', 'mozarella', 'pecorino'];
var word = words[Math.floor(Math.random() * words.length)];
var guessedWordArray = generateGuessedWordArray(word) 
var guessedWord = '' 
var lifes = 5;
var playedLetters = [];
var alphabet = 'abcdefghijklmnopqrstuvwxyz'
var alphabetUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
guessedWordToString();

function validateInputLetter(letter) {
    if (letter.length !== 1 || letter === ' ' || !isNaN(letter)) {
        alert('make sure you put a single letter')
        return;
    }
     for (var i = 0; i < alphabet.length; i++) {
        if (letter === alphabet[i] || letter === alphabetUpper[i]) { 
            
            for (var j = 0; j < playedLetters.length; j++) { 
                if (playedLetters[j] === alphabet[i]) {
                    alert('you already tried this');
                    return alphabet[i]
                }
            }
            playedLetters[playedLetters.length] = alphabet[i] 
            return alphabet[i]
        }
    }
    return;
}
function checkLetterIncluded(letter) { a
    var isLetterInWord = false 
    for (var i = 0; i < word.length; i++) { 
        if (letter === word[i]) {
            isLetterInWord = true 
            guessedWordArray[i] = letter
        }
    }
    if (isLetterInWord === false) { 
        lifes--
    } else {
        guessedWordToString() 
    }
}
function generateGuessedWordArray(_word) { 
    var tempArr = []
    for (var i = 0; i < _word.length; i++) { 
        if (_word[i] === ' ') {
            tempArr[tempArr.length] = ' '
        } else {
            tempArr[tempArr.length] = '-'
        }
    }
    return tempArr;
}
function guessedWordToString() { 
    guessedWord = ''
    for (var i = 0; i < guessedWordArray.length; i++) {
        guessedWord += guessedWordArray[i]
    }
}
function playGame(letter) {
    if (lifes <= 0) {
        alert('you can not play anymore, you are dead')
        return;
    }
    var validatedLetter = validateInputLetter(letter)
    if (validatedLetter !== undefined) {
        checkLetterIncluded(validatedLetter)
        cleanInterface();
        renderInterface();
    }
}
function resetGame() {
    word = words[Math.floor(Math.random() * words.length)];
    guessedWordArray = generateGuessedWordArray(word);
    guessedWordToString();
    lifes = 5;
    playedLetters = [];
}
var body = document.body;
var wordContainer;
var lifesContainer;
var letterFormContainer;
var playAgainButton;
var userFeedbackContainer;
var playedLettersContainer;

var backgroundImageDiv = document.createElement('div');
backgroundImageDiv.style.width = '100%';
backgroundImageDiv.style.height = '100%';
backgroundImageDiv.style.position = 'absolute';
backgroundImageDiv.style.zIndex = '-1';


var backgroundImage = document.createElement('img');
backgroundImage.src = 'backgroundImg.jpg';
backgroundImage.style.height = '100%';
backgroundImage.style.width = '100%';
backgroundImage.style.filter = 'blur 2px';
backgroundImage.style.filter = 'saturate 50%';

backgroundImageDiv.appendChild(backgroundImage);
body.appendChild(backgroundImageDiv);

body.style.display = 'flex';
body.style.flexDirection = 'column';
body.style.alignItems = 'center'
body.style.gap = '2rem';

var gameTitle = document.createElement('h1');
gameTitle.textContent = 'THE HANGMAN GAME';
gameTitle.style.textAlign = 'center';
gameTitle.style.fontSize = '100px';


body.appendChild(gameTitle);

function renderLetterForm() {
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

    body.appendChild(letterFormContainer)
}
function renderPlayAgainButton() {
    playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Play Again';
    playAgainButton.style.width = '7rem';

    body.appendChild(playAgainButton);
    playAgainButton.addEventListener('click', function (event) {
        event.preventDefault();
        resetGame();
        alert('reseting game')
        cleanInterface();
        renderInterface();
    })
}
function renderWordContainer() {
    wordContainer = document.createElement('div');
    wordContainer.style.width = '100%';
    wordContainer.style.height = '100px';
    wordContainer.style.display = 'flex';
    wordContainer.style.flexDirection = 'row';
    wordContainer.style.gap = '0.5rem';
    wordContainer.style.justifyContent = 'center';
    

    for (var i = 0; i < guessedWordArray.length; i++) {
        var letterSquare = document.createElement('div');
        letterSquare.style.height = "4rem";
        letterSquare.style.width = "4rem";
        letterSquare.style.border = "2px dashed slategray"
        letterSquare.style.display = "flex";
        letterSquare.style.justifyContent = "center"
        letterSquare.style.alignItems = "center"
        if (guessedWordArray[i] !== '-') {
            var letterContainer = document.createElement('b');
            letterContainer.textContent = guessedWordArray[i].toUpperCase();
            letterSquare.style.border = "2px solid green"
            letterSquare.style.backgroundColor = "limegreen"
            letterSquare.appendChild(letterContainer)
        }
        wordContainer.appendChild(letterSquare)
    }
    body.appendChild(wordContainer)
}
function renderLifesContainer() {
    lifesContainer = document.createElement('div');
    lifesContainer.style.width = '100%';
    lifesContainer.style.display = 'flex';
    lifesContainer.style.flexDirection = 'row';
    lifesContainer.style.gap = '1rem';
    lifesContainer.style.justifyContent = 'center';

    for (var i = 0; i < 5; i++) {
        if (i < lifes) {
            var lifeIcon = document.createElement('span');
            lifeIcon.textContent = 'favorite'
            lifeIcon.className = 'material-symbols-outlined';
            lifeIcon.style.color = 'red'

            lifesContainer.appendChild(lifeIcon)
        } else {
            var lifeIcon = document.createElement('span');
            lifeIcon.textContent = 'favorite'
            lifeIcon.className = 'material-symbols-outlined';
            lifeIcon.style.color = 'lightgrey'

            lifesContainer.appendChild(lifeIcon)
        }
    }
    body.appendChild(lifesContainer)
}
function renderUserFeedback() {
    if (lifes <= 0) {
        userFeedbackContainer = document.createElement('div')
        var loseMsg = document.createElement('h2');
        loseMsg.textContent = `Oh! You're out of lifes!`;
        loseMsg.style.color = 'red';
        loseMsg.style.textAlign = 'center'
        userFeedbackContainer.appendChild(loseMsg);
    } else { 
        userFeedbackContainer = document.createElement('div')
        var winMsg = document.createElement('h2');
        winMsg.textContent = `Congratulations! You guessed the world!`;
        winMsg.style.color = 'green';
        winMsg.style.textAlign = 'center'
        userFeedbackContainer.appendChild(winMsg);
    }
    body.appendChild(userFeedbackContainer)
}
function renderPlayedLettersContainer() {
    playedLettersContainer = document.createElement('div');
    playedLettersContainer.style.display = 'flex';
    playedLettersContainer.style.flexDirection = 'column'

    var playedLettersTitle = document.createElement('h2');
    playedLettersTitle.textContent = 'You already tried:';

    playedLettersContainer.appendChild(playedLettersTitle);

    var letterSquaresContainer = document.createElement('div');
    letterSquaresContainer.style.display = 'flex';
    letterSquaresContainer.style.flexWrap = 'wrap';
    letterSquaresContainer.style.gap = '0.5rem';

    for (var i = 0; i < playedLetters.length; i++) {
        var letterContainer = document.createElement('b');
        letterContainer.style.height = "2rem";
        letterContainer.style.width = "2rem";
        letterContainer.style.border = "2px solid slategray"
        letterContainer.style.display = "flex";
        letterContainer.style.justifyContent = "center"
        letterContainer.style.alignItems = "center"
        letterContainer.style.backgroundColor = "lightgray"
        letterContainer.style.textAlign = 'center';
        letterContainer.textContent = playedLetters[i].toUpperCase()
        letterSquaresContainer.appendChild(letterContainer)
    }
    playedLettersContainer.appendChild(letterSquaresContainer)
    body.appendChild(playedLettersContainer)
}
function renderInterface() {
    renderWordContainer();
    renderLifesContainer();
    if (lifes <= 0 || guessedWord === word) {
        renderUserFeedback();
        renderPlayAgainButton();
    } else { 
        renderLetterForm();
    }

    if (playedLetters.length > 0) renderPlayedLettersContainer();
}
function cleanInterface() {
    body.removeChild(wordContainer);
    body.removeChild(lifesContainer);
    if (letterFormContainer) body.removeChild(letterFormContainer);
    if (playAgainButton) body.removeChild(playAgainButton);
    if (userFeedbackContainer) body.removeChild(userFeedbackContainer);
    if (playedLettersContainer) body.removeChild(playedLettersContainer);
    wordContainer = undefined;
    lifesContainer = undefined;
    letterFormContainer = undefined;
    playAgainButton = undefined;
    userFeedbackContainer = undefined;
    playedLettersContainer = undefined;
}
renderInterface()
addEventListener('submit', function (event) {
    event.preventDefault();
    var letterValue = event.target.letter.value;
    playGame(letterValue)
})