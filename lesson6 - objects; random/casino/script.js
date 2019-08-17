'use strict'

casino();

function casino(){
    let userScore = 0;
    userScore = guessNumber(userScore);
    
    function guessNumber(score){
        const CORRECT_GUESS = 10;
        const INCORRECT_GUESS = 2;
        const RANDOM_NUMBER = Math.trunc(Math.random() * 10);
        
        let userGuess;

        do {
            userGuess = prompt('Guess a number from 0 to 10.\nCorrect answer - get 10 points, wrong answer - lose 2 points.');
        } while (userGuess < 0 || userGuess > 10 || 
                !userGuess || isNaN(userGuess));
            
        if (userGuess == RANDOM_NUMBER) {
            score += CORRECT_GUESS;
            alert('Correct!');
        } else {
            score -= INCORRECT_GUESS;
            alert('Wrong! ' + 'It is ' + RANDOM_NUMBER + '.');
        }

        let retry = confirm('Try again?');
        return (retry) ? guessNumber(score) : score;
    }
    alert('Your score is ' + userScore + '.');
    return userScore; 
}

