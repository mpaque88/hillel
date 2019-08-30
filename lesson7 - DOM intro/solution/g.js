'use strict'

const DIV_MIN = document.getElementById('min');
const DIV_MAX = document.getElementById('max');
const H1_GREETING = document.getElementById('greeting');

const userName = getUserName();
printGreeting(userName);

const userInput = getUserInput();
if (numbersValid(userInput)) {
    const values = getMinMax(userInput);
    printMinMax(values);
} else {
    printError();
}

function getUserName() {
    let value;
    do {
        value = prompt('What is your name?');
        value = value && value.trim();
    } while (!value);
    return value;
}

function printGreeting(name) {
    H1_GREETING.innerHTML = `Hello, ${name}!`;
}

function getUserInput() {
    let value;
    do {
        value = prompt('What are your numbers?');
        value = value && value.trim();
    } while (!value);
    return value.split(',').map(Number);
    //turns string into an array, each 
    //elem of which is turned into a number
}

function numbersValid(nums) {
    return !nums.some(isNaN); 
    //checks if any of the elements in an array pass a test
}

function getMinMax(nums){
    nums.sort((a, b) => a - b);
    //compare function - returns -x, 0 or x
    //a - b: ascending order (1...10)
    //b - a: descending order (10...1)
    return {
        min: nums[0],
        max: nums[nums.length - 1]
    }
}

function printMinMax(values) {
    DIV_MIN.innerHTML = `Min value: ${values.min}`;
    DIV_MAX.innerHTML = `Max value: ${values.max}`;
}

function printError() {
    DIV_MAX.innerHTML = 'Wrong input!';
    DIV_MAX.style.background = 'red';
}



