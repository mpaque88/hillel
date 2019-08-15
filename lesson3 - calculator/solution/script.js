let operation = null;
let operandsCount = null;
let operand = null;
let result = null;

do {
    operation = prompt('Choose action (add, sub, div, mult)', 'add');
} while (
    operation != 'add' &&
    operation != 'sub' &&
    operation != 'div' &&
    operation != 'mult'
)

do {
    operandsCount = prompt('Operands count', '2');
} while (isNaN(operandsCount) || operandsCount <= 0 || operandsCount >= 5)

for (let i = 1; i <= operandsCount; i++){
    do {
        operand = +prompt('Operand ' + i, '0');
    } while (isNaN(operand))

    if (result === null){
        result = operand;
        continue;
    }

    switch (operation){
        case 'add': result += operand; break;
        case 'sub': result -= operand; break;
        case 'div': result /= operand; break;
        case 'mult': result *= operand; break;
    }
}

alert('Result: ' + result);