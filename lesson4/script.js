'use strict';

let ACTION;
let ARGUMENT_ONE;
let ARGUMENT_TWO;
let RESULT;

function addition(arg1, arg2) { let result = arg1 + arg2; return result; };
function substraction(arg1, arg2) { let result = arg1 - arg2; return result; };
function multiplication(arg1, arg2) { let result = arg1 * arg2; return result; };
function division(arg1, arg2) { let result = arg1 / arg2; return result; };

do { 
    ACTION = prompt('Choose one: add, sub, mult or div').toLowerCase().trim();
} while (ACTION != 'add' && ACTION != 'sub' &&
         ACTION != 'mult' && ACTION != 'div');

do { 
    ARGUMENT_ONE = +prompt('Submit first argument:', '6');
} while (!ARGUMENT_ONE || isNaN(ARGUMENT_ONE));

do { 
    ARGUMENT_TWO = +prompt('Submit second argument:', '3');
} while (!ARGUMENT_TWO || isNaN(ARGUMENT_TWO));

switch (ACTION) {
    case 'add': RESULT = addition(ARGUMENT_ONE, ARGUMENT_TWO); break;
    case 'sub': RESULT = substraction(ARGUMENT_ONE, ARGUMENT_TWO); break;
    case 'mult': RESULT = multiplication(ARGUMENT_ONE, ARGUMENT_TWO); break;
    case 'div': RESULT = division(ARGUMENT_ONE, ARGUMENT_TWO); break;
};

alert('Result: ' + RESULT);


