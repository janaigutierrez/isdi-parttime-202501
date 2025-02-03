function guessNumber() {
    var number = 8;
    var guess = prompt ('qué número estoy pensando?');
    if (number === guess) {
        alert('Bingo!')
    } else {
        alert('Fatal');
        if((guess - number) > 5) {
            console.log("Frío")
        }
        else {
            console.log("Caliente");
        }
    }
}