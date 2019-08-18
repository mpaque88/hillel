'use strict'

let someString = prompt('Submit some string: ', 'kabak');
alert(isPalindrom(someString));

function isPalindrom(str) {
	let revStr = '';
	str = str.toLowerCase().trim();

	for (let i = str.length; i > 0; i--) {
		revStr += str[i - 1];
	}

	return (str == revStr) ? true : false; 
}