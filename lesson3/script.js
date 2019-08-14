'use strict';

let action;

do {
    action = prompt('Choose action: add, sub, mult or div', '');
} while (action != 'add' && action != 'sub' &&
         action != 'mult' && action != 'div' || !action);

let operandsQuantity;

do {
    operandsQuantity = Number(prompt('How many operands?', ''));
} while (isNaN(operandsQuantity) || operandsQuantity < 2 || operandsQuantity > 5);

let operands = [];

for (let i = 0; i < operandsQuantity; i++) {
    do {
        operands[i] = prompt('Type ' + [i + 1] + ' operand.');
    } while (isNaN(operands[i]) || !operands[i]);
};

//addition

let addition = 0;

if (action == 'add') {
    for (let i = 0; i < operands.length; i++) {
        addition += +operands[i];
    };
    alert('Addition result is ' + addition);
};

//subsctraction

let subsctraction = 0;

switch (action == 'sub') {
    case operands.length > 2:
        for (let i = 2; i < operands.length; i++) {
            subsctraction -= operands[i];
        }; break;
    default: subsctraction = operands[0] - operands[1];
}

if (action == 'sub') { alert('Subsctraction result is ' + subsctraction); };

//multiplication

let multiplication = 1;

if (action == 'mult') {
    for (let i = 0; i < operands.length; i++) {
        multiplication *= operands[i];
    };
    alert('Multiplication result is ' + multiplication);
};

//division

let division;

if (action == 'div') {
    division = operands[0] / operands[1];
    if (operands.length > 2) {
        for (let i = 2; i < operands.length; i++) {
            division /= operands[i];
        };
    };
    if (operands[1] == '0' || operands[2] == '0' ||
        operands[3] == '0' || operands[4] == '0') {
        alert('Division by zero is unacceptable here.');
    } else {
        alert('Division result is ' + division);
    };
};
