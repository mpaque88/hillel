
// #1

// for (let i = 2; i <= 10; i++) {
//   if (i % 2 == 0) {
//     alert( i );
//   }
// }

// #2

// let i = 0;

// while (i < 3) {
// 	alert( `number ${i}!` );
// 	i++;
// }

// #3

// let num = null;

// do {
// 	num = prompt('Type a number greater than 100', '');
// } while (num <= 100 || isNaN(num));


// #4 - output prime numbers
// my solution:

// let n = prompt('Type n');

// for (let i = 2; i <= n; i++) {
// 	if (i == 2 || i % 2) {
// 		alert(i);
// 	}
// }

//solution:

// let n = 10;

// nextPrime:
// for (let i = 2; i <= n; i++) { // for each i...

//   for (let j = 2; j < i; j++) { // look for a divisor..
//     if (i % j == 0) continue nextPrime; // not a prime, go next i
//   }

//   alert( i ); // a prime
// }