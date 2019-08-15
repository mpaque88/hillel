'use strict';

let action;
let argumentOne = null;
let argumentTwo = null;
let result;

function addition(arg1, arg2) { 
	return +arg1 + +arg2; 
};
function substraction(arg1, arg2) { 
	return arg1 - arg2; 
};
function multiplication(arg1, arg2) { 
	return arg1 * arg2; 
};
function division(arg1, arg2) { 
	return arg1 / arg2; 
};

do { 
    let x = prompt('Choose one: add, sub, mult or div');
    action = x && x.toLowerCase().trim();
} while (action != 'add' && action != 'sub' && 
		 action != 'mult' && action != 'div');

do { 
    argumentOne = prompt('Submit first argument:', '');
} while (isNaN(argumentOne) || argumentOne == null);

do { 
    argumentTwo = prompt('Submit second argument:', '');
} while (isNaN(argumentTwo) || argumentTwo == null);

switch (action) {
    case 'add': result = addition(argumentOne, argumentTwo); 
    break;
    case 'sub': result = substraction(argumentOne, argumentTwo); 
    break;
    case 'mult': result = multiplication(argumentOne, argumentTwo); 
    break;
    case 'div': result = division(argumentOne, argumentTwo); 
    break;
};

if (action == 'div' && argumentTwo == 0) {
	alert('Division by zero is unacceptable here.');
} else {
	alert('Result: ' + result);
};
