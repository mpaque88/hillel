'use strict'

let value = null;
multOperation(value);


function multOperation() {
	do {
		value = prompt('Submit a number', '2');
	} while (isNaN(value) || value < 1 ||  value > 10)
	
	multTable(value);

	function multTable(num) {
		for (let i = 1; i < 11; i++) {
			let result = num * i;
			console.log(num, '*', i, '=', result);
		};
	}
	
	let startOver = confirm('Start over?');
	if (startOver) {
		value = null;
		multOperation(value);
	};
}




