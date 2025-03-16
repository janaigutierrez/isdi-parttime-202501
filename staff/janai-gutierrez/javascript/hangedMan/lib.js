// Tria una paraula a l'atzar dins d'un array
function chooseRandomWord(words) {
    return words[Math.floor(Math.random() * words.length)];
  }
  
  // Crea un array amb '-' per a cada lletra de la paraula (o espai si és ' ')
  function createHiddenArrayFromWord(word) {
    var arr = [];
    for (var i = 0; i < word.length; i++) {
      if (word[i] === ' ') {
        arr.push(' ');
      } else {
        arr.push('-');
      }
    }
    return arr;
  }
  
  // Comprova si la cadena és una sola lletra (a-z / A-Z)
  function isSingleLetter(str) {
    return (str.length === 1 && !!str.match(/[a-zA-Z]/));
  }
  
  // Actualitza l'array de lletres endevinades si la lletra és dins la paraula.
  // Retorna true si s'ha trobat, false en cas contrari.
  function updateGuessedWordArray(word, guessedArray, letter) {
    var found = false;
    for (var i = 0; i < word.length; i++) {
      if (word[i].toLowerCase() === letter.toLowerCase()) {
        guessedArray[i] = word[i]; // substitueix '-' per la lletra real
        found = true;
      }
    }
    return found;
  }
  