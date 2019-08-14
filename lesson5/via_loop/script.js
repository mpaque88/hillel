'use strict'

let someString = 'Hello world';
let anotherString = replaceAll(someString, 'l', 'z');
console.log(anotherString);

function replaceAll(str, inChar, outChar) {

	if (inChar.length > 1 || outChar.length > 1) {
		console.warn('Wrong input');
	} else {
		do {
			str = str.replace(inChar, outChar);
		} while (str.indexOf(inChar) != -1);
	}

	return str;
}


