'use strict'

const CORRECT_GUESS = 10;
const INCORRECT_GUESS = 2;

let userScore = 0;
guessNumber(userScore);

function guessNumber(score){
    let random = Math.trunc(Math.random() * 10);
    let userGuess;

    do {
        userGuess = prompt('Guess a number from 0 to 10.\nCorrect answer - get 10 points, wrong answer - lose 2 points.');
    } while (userGuess < 0 || userGuess > 10 || !userGuess || isNaN(userGuess));
        
    if (userGuess == random) {
        score += CORRECT_GUESS;
        alert('Correct!');
    } else {
        score -= INCORRECT_GUESS;
        alert('Wrong! ' + 'It is ' + random + '.');
    }

    let retry = confirm('Try again?');
    (retry) ? guessNumber(score) : alert('Your score is ' + score + '.');
}

