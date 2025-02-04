var isGameOn = confirm('Wanna play a game?');
if(isGameOn) {
    numberGuessGame()
} else {
    alert('Ciao!');
}
function numberGuessGame() {
    var winNumber = Math.floor(Math.random()* 10 + 1);
    var attempts = 0
    var guess = null
    

    while(guess !== winNumber) {
        var input = prompt('Which one is the secret number?');
        if(input === null) {
            alert('Leaving the game');
            return;
        } 
    }
    var guess = parseInt(input);
    attempts++;

    if(isNaN(guess)) {
        alert("That's not a number sir.")
    } else if(guess < winNumber) {
        alert('Too low, try again');
    } else if(guess > winNumber) {
        alert("Too high, try again");
    } else {
        alert("Congrats! You solved the game in ${attempts} attempts.")
    }
}
