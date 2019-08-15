'use strict'

let someString = prompt('Submit some string: ', 'kabak');
alert(isPalindrom(someString));


function isPalindrom(str) {
	
	str = str.toLowerCase().trim();
	let rev = str.split('').reverse().join('');

	return (str == rev) ? true : false; 
}