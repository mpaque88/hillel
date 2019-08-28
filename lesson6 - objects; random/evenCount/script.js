'use strict'

let number;

do {
    number = prompt('Submit a number', '1234');    
} while (!number || isNaN(number))

let evenNums = evenCount(number);
alert(evenNums + ' even number(-s).');

function evenCount(num) {
    let evens = 0;
    num = num.slice('');

    for (let i = 0; i < num.length; i++) {
        if (num[i] % 2 == 0) evens += 1
    }

    return evens;
}