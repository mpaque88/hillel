'use strict';

let userScore = 0;

const firstQuestion = confirm('Is 2+2=5 correct?');
if (!firstQuestion) { userScore += 10 };

const secondQuestion = prompt('What is the opposite to "better"?');
const secondAnswer = secondQuestion && secondQuestion.toLowerCase().trim(); 
if (secondAnswer == 'worse') { userScore += 10; };

const thirdQuestion = prompt('2+2*2=?');
const thirdAnswer = thirdQuestion && thirdQuestion.toLowerCase().trim();
if (thirdAnswer == '6' || thirdAnswer == 'six') { userScore += 10};

switch (userScore) {
	case 30: alert('Your score is 30/30 points. Congratulations!'); 
	break;
	case 20: alert('Your score is 20/30 points. Well done!'); 
	break;
	case 10: alert('Your score is 10/30 points. Try your luck next time!'); 
	break;
	default: alert('Your score is 0/30 points. Please try again.');
}




