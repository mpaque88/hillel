'use strict'

const toDoList = document.getElementById('list');
toDoList.addEventListener('click', rmTask);
toDoList.addEventListener('click', markTask);

const newTaskInput = document.getElementById('newTaskInput');
const btnTemplate = document.getElementById('delTaskTemplate').innerHTML;

const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', newTask);

function newTask(e) {
    e.preventDefault();
    
    addToList();
    clearInput();
}

function addToList() {
    const li = createLi();
    li.classList.add('task')   
    toDoList.appendChild(li);
}

function createLi() {
    let newLi = document.createElement('li');
    newLi.innerHTML = btnTemplate + newTaskInput.value; 
    return newLi;
}

function rmTask(e) {
    if (e.target.tagName == 'BUTTON') {
        e.target.parentElement.remove();
    }
}

function markTask(e) {
    if (e.target.tagName == 'LI') {
        e.target.classList.toggle('taskDone');
        e.target.firstChild.classList.toggle('hidden');
    }
}

function clearInput() {
    newTaskInput.value = '';
}
