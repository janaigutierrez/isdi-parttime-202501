// ------------------------------
// Variables globals del joc
// ------------------------------
var words = ["peperoni", "alfabrega", "tomàquet", "mozzarella", "formatge", "prosciuto"];
var word = "";
var guessedWordArray = [];
var playedLetters = [];
var lifes = 5;

// Referències als elements del DOM
var wordContainer, livesContainer, playedLettersContainer;
var guessForm, letterInput, resultMessage, playAgainBtn;

// ------------------------------
// Inicialització del joc
// ------------------------------
function initGame() {
  word = chooseRandomWord(words);            // funció de lib.js
  guessedWordArray = createHiddenArrayFromWord(word); // idem
  playedLetters = [];
  lifes = 5;

  // Primer netegem tot el body (per si reiniciem)
  document.body.innerHTML = "";

  // Creem la interfície bàsica
  createLayout();

  // Pintem l'estat inicial (paraula, vides, etc.)
  render();
}

// ------------------------------
// Creació de la interfície
// ------------------------------
function createLayout() {
  // Títol
  var h1 = document.createElement("h1");
  h1.textContent = "Hangman Game";
  document.body.appendChild(h1);

  // Contenidor de la paraula
  wordContainer = document.createElement("div");
  wordContainer.className = "word-container";
  document.body.appendChild(wordContainer);

  // Contenidor de vides
  livesContainer = document.createElement("div");
  livesContainer.className = "lives-container";
  document.body.appendChild(livesContainer);

  // Lletres jugades
  playedLettersContainer = document.createElement("div");
  playedLettersContainer.className = "played-letters";
  document.body.appendChild(playedLettersContainer);

  // Formulari per introduir lletres
  guessForm = document.createElement("form");
  document.body.appendChild(guessForm);

  letterInput = document.createElement("input");
  letterInput.type = "text";
  letterInput.maxLength = 1;
  letterInput.required = true;
  guessForm.appendChild(letterInput);

  var submitBtn = document.createElement("input");
  submitBtn.type = "submit";
  submitBtn.value = "Prova";
  guessForm.appendChild(submitBtn);

  // Missatge final (guanyat / perdut)
  resultMessage = document.createElement("div");
  resultMessage.id = "resultMessage";
  resultMessage.className = "hidden";
  document.body.appendChild(resultMessage);

  // Botó per tornar a jugar
  playAgainBtn = document.createElement("button");
  playAgainBtn.textContent = "Torna a jugar";
  playAgainBtn.className = "hidden";
  document.body.appendChild(playAgainBtn);

  // Esdeveniments
  guessForm.addEventListener("submit", onGuessSubmit);
  playAgainBtn.addEventListener("click", onPlayAgain);
}

// ------------------------------
// Renderitzar l'estat del joc
// ------------------------------
function render() {
  // Pintar la paraula
  wordContainer.innerHTML = "";
  for (var i = 0; i < guessedWordArray.length; i++) {
    var box = document.createElement("div");
    box.className = "letter-box";
    if (guessedWordArray[i] !== "-") {
      box.classList.add("correct");
      box.textContent = guessedWordArray[i].toUpperCase();
    }
    wordContainer.appendChild(box);
  }

  // Pintar vides
// ...
livesContainer.innerHTML = ""; // buidar abans
for (var i = 0; i < 5; i++) {
  var lifeIcon = document.createElement("span");
  lifeIcon.className = "life-icon";
  // Si i < lifes => vida activa
  if (i < lifes) {
    lifeIcon.textContent = "♥";
  } else {
    // vida perduda, fem que caigui
    lifeIcon.textContent = "♥";
    lifeIcon.classList.add("lost-life");
  }
  livesContainer.appendChild(lifeIcon);
}

  // Lletres ja jugades
  playedLettersContainer.innerHTML = "";
  if (playedLetters.length > 0) {
    playedLettersContainer.textContent = "Lletres provades: " + playedLetters.join(", ");  // mètode array
  }
}

// ------------------------------
// Quan l'usuari prem "Prova"
// ------------------------------
function onGuessSubmit(e) {
  e.preventDefault();
  var letter = letterInput.value;
  letterInput.value = ""; // buidem el camp

  // Comprova si és una lletra vàlida (funció de lib.js)
  if (!isSingleLetter(letter)) {
    alert("Introdueix una sola lletra (A-Z).");
    return;
  }
  // Comprova si ja l'havíem jugat
  if (playedLetters.indexOf(letter.toLowerCase()) !== -1) {
    alert("Ja has provat aquesta lletra!");
    return;
  }
  playedLetters.push(letter.toLowerCase());

  // Actualitza guessedWordArray
  var found = updateGuessedWordArray(word, guessedWordArray, letter);
  if (!found) {
    lifes--;
  }

  // Torna a pintar
  render();

  // Comprova si s'ha acabat el joc
  checkEndGame();
}

// ------------------------------
// Comprova si hem guanyat o perdut
// ------------------------------
function checkEndGame() {
  // Si hem encertat totes les lletres
  if (guessedWordArray.join("") === word) {
    resultMessage.textContent = "Enhorabona! Has encertat la paraula: " + word.toUpperCase();
    endGame();
  } 
  else if (lifes <= 0) {
    resultMessage.textContent = "Has perdut! La paraula era: " + word.toUpperCase();
    endGame();
  }
}

// ------------------------------
// Quan el joc acaba (guany o derrota)
// ------------------------------
function endGame() {
  resultMessage.classList.remove("hidden");
  guessForm.classList.add("hidden");
  playAgainBtn.classList.remove("hidden");
}

// ------------------------------
// Quan premem "Torna a jugar"
// ------------------------------
function onPlayAgain() {
  initGame();
}

// ------------------------------
// Comencem el joc en carregar la pàgina
// ------------------------------
initGame();
