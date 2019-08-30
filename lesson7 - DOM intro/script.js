'use strict'

let name;

do {
    name = prompt('What is your name?', '');
} while (!name);

document.getElementById('greeting').innerHTML = `Hello, ${name}!`;

let userInput;

do {
    userInput = prompt('Submit some numbers, separate them with a comma', '1,5,    3,4,a');
} while (!userInput);

userInput = stringToSortedArray(userInput);

function stringToSortedArray(string) {
    let arr = string.split(',');
    
    string[string.length - 1] == ',' && arr.pop();

    arr = arr.map((x) => +x.trim());
    arr.sort();

    return arr;
}

if (userInput.find(x => isNaN(x)) != undefined) {
    let maxDiv = document.getElementById('max');
    wrongInput(maxDiv);
} else {
    minMax(userInput);
}

function wrongInput(elem) {
    elem.style.display = 'inline-block';
    elem.style.padding = '0 2em';
    elem.style.backgroundColor = 'red';
    elem.style.color = 'white';
    elem.innerHTML = '<h2>Wrong input</h2>';
}

function minMax(arr) {
    let min = arr[0];
    document.getElementById('min').innerHTML = `The minimum value is ${min}.`;
    let max = arr[arr.length - 1];
    document.getElementById('max').innerHTML = `The maximum value is ${max}.`;
}
