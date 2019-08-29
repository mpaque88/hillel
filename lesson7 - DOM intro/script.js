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

let array = stringToSortedArray(userInput);

function stringToSortedArray(string) {
    let arr = string.split(',');
    string[string.length - 1] == ',' && arr.pop();

    for (let i in arr) arr[i] = arr[i].trim();
    arr.sort();
    return arr;
}

minMax(array);

function minMax(arr) {
    for (let i in arr) arr[i] = +arr[i];

    let checkNaN = function () {
        for (let i in arr) if (isNaN(arr[i])) return true;
        return false;
    }(arr);

    if (!checkNaN) {
        let min = array[0];
        document.getElementById('min').innerHTML = `The minimum value is ${min}.`;
        let max = array[array.length - 1];
        document.getElementById('max').innerHTML = `The maximum value is ${max}.`;
    } else {
        let maxDiv = document.getElementById('max');
        maxDiv.style.display = 'inline-block';
        maxDiv.style.padding = '0 2em';
        maxDiv.style.backgroundColor = 'red';
        maxDiv.style.color = 'white';
        maxDiv.innerHTML = '<h2>Wrong input</h2>';
    }
}