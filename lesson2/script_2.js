'use strict';

let userScore;
let scoreAlert;

const firstAnswer = confirm('Is 2+2=5 correct?');
if (!firstAnswer) { userScore += 10; };

let secondAnswer = prompt('What is the opposite to "better"?');
secondAnswer = secondAnswer && secondAnswer.toLowerCase().trim();
if (secondAnswer == 'worse') { userScore += 10; };

let thirdAnswer = prompt('2+2*2=?');
thirdAnswer = thirdAnswer && thirdAnswer.toLowerCase().trim();
if (thirdAnswer == 'six' || thirdAnswer == '6') { userScore += 10; };

switch (userScore) {
	case 30: scoreAlert = 'Your score is 30/30 points. Congratulations!'; 
	break;
	case 20: scoreAlert = 'Your score is 20/30 points. Well done!'; 
	break;
	case 10: scoreAlert = 'Your score is 10/30 points. Try your luck next time!'; 
	break;
	default: scoreAlert = 'Your score is 0/30 points. Please try again.';
}

alert(scoreAlert);




