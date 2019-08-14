'use strict'

let someString = 'Hello world';
let anotherString = replaceAll(someString, 'l', 'z');
console.log(anotherString);

function replaceAll(str, inChar, outChar) {
	if (inChar.length > 1 || outChar.length > 1) {
		console.warn('Wrong input');
	} else {
		for (let i = 1; i < str.length; i++) {
			str = str.replace(inChar, outChar);
		}
	}

	return str;
}


