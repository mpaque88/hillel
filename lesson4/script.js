'use strict';

let CALC_ACTION;
let ARGUMENT_ONE;
let ARGUMENT_TWO;
let CALC_RESULT;

+function chooseAction() {
    do {
        CALC_ACTION = prompt('Choose one: add, sub, mult or div');
    } while (CALC_ACTION != 'add' &&
             CALC_ACTION != 'sub' &&
             CALC_ACTION != 'mult' &&
             CALC_ACTION != 'div');
}();

+function argumentOne() {
    do {
        ARGUMENT_ONE = +prompt('Submit first argument:', '2');
    } while (!ARGUMENT_ONE || isNaN(ARGUMENT_ONE));
}();

+function argumentTwo() {
    do {
        ARGUMENT_TWO = +prompt('Submit second argument:', '3');
    } while (!ARGUMENT_TWO || isNaN(ARGUMENT_TWO));
}();

+function calculation() {
    switch (CALC_ACTION) {
        case 'add': CALC_RESULT = ARGUMENT_ONE + ARGUMENT_TWO; break;
        case 'sub': CALC_RESULT = ARGUMENT_ONE - ARGUMENT_TWO; break;
        case 'mult': CALC_RESULT = ARGUMENT_ONE * ARGUMENT_TWO; break;
        case 'div': CALC_RESULT = ARGUMENT_ONE / ARGUMENT_TWO; break;
    };    
    console.log(CALC_RESULT);
}();


console.log(CALC_ACTION, ARGUMENT_ONE, ARGUMENT_TWO, 'result: ', CALC_RESULT);             


