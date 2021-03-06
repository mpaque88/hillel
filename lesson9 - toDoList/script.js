'use strict'

const toDoList = document.getElementById('list');
toDoList.addEventListener('click', listOnClick);

const newTaskInput = document.getElementById('newTaskInput');
const btnTemplate = document.getElementById('delTaskTemplate').innerHTML;

const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', addBtnOnClick);

function addBtnOnClick(e) {
    e.preventDefault();
    
    const li = createTask();
    addTaskToList(li);
    clearInput();
}

//creating task

function createTask() {
    const newTask = document.createElement('li');
    newTask.innerHTML = btnTemplate + newTaskInput.value; 
    return newTask;
}

function addTaskToList(task) {
    task.classList.add('task');
    toDoList.appendChild(task);
}

function clearInput() {
    newTaskInput.value = '';
}

//mark and rm

function listOnClick(e) {
    if (e.target.classList.contains('rmBtn')) rmTask(e.target.parentElement);
    if (e.target.classList.contains('task')) markTask(e.target);
}

function rmTask(el) {
    el.remove();
}

function markTask(el) {
    el.classList.toggle('taskDone');
    if (el.firstChild.classList.contains('rmBtn')) el.firstChild.classList.toggle('hidden');
}