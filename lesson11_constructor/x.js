'use strict'

const students = [];
const jack = new Student('Jack', [5, 4, 3]);
const jon = new Student('Jon', [3, 2, 4]);

function Student(name, marks) {
    this.name = name;
    this.marks = marks;
    students.push(this);
}

Student.prototype.averageMark = function() { 
    return averageOfArr(this.marks) 
}

function averageGroupMark(students) {
    let arr = [];
    for (let x in students) arr[x] = averageOfArr(students[x].marks); 
    return averageOfArr(arr)
}

function averageOfArr(arr) {
    let sum = 0;
    for (let x of arr) sum += x;
    return sum / arr.length
}

