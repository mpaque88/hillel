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

function averageGroupMark(arr) {
    let group = [];
    for (let x in arr) group[x] = averageOfArr(arr[x].marks); 
    return averageOfArr(group)
}

function averageOfArr(arr) {
    let sum = 0;
    for (let x of arr) sum += x;
    return sum / arr.length
}

