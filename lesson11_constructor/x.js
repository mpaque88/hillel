'use strict'

function Student(name, marks) {
    this.name = name;
    this.marks = marks;
}

Student.prototype.averageMarks = function(arr) {
    arr = this.marks;
    let sum = 0;

    for (let key of arr) sum += key;

    return sum / arr.length
}

Student.prototype.sayHi = function() {
    console.log(`Hello ${this.name}!`);
}

const jack = new Student('Jack', [5, 4, 3]);

