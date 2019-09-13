'use strict'

const jack = new Student('Jack', [5, 4, 3]);
const jon = new Student('Jon', [3, 2, 4]);

function Student(name, marks) {
    this.name = name;
    this.marks = marks;
}

Student.prototype.averageMark = function () {
    return averageOf(this.marks)
}

function averageOf(array) {
    return sumOf(array) / array.length
}

function sumOf(array) {
    return (array.length == 0) ? 0 : array[0] + sumOf(array.slice(1))
}

function averageOfGroup(...students) {
    let group = [];

    students.forEach( (student) => group.push(student.averageMark()) );

    return averageOf(group);
}