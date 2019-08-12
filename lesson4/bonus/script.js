'use strict'

let value = null;

for (;!value;) {
	do {
		value = prompt('Submit a number', '2');
	} while (isNaN(value) || value < 1 ||  value > 10)

	for (let i = 1; i < 11; i++) {
		let result = value * i;
		console.log(value, '*', i, '=', result);
	};

	let startOver = confirm('Start over?');
	if (startOver) { value = null; };			
}


