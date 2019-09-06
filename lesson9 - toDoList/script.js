'use strict'

const toDoList = document.getElementById('list');
toDoList.addEventListener('click', listOnClick);

const newTaskInput = document.getElementById('newTaskInput');
const btnTemplate = document.getElementById('delTaskTemplate').innerHTML;

const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', onAddBtnClick);

function onAddBtnClick(e) {
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
    task.classList.add('task')   
    toDoList.appendChild(task);
}

function clearInput() {
    newTaskInput.value = '';
}

//mark and rm

function listOnClick(e) {
    if (e.target.classList.contains('rmBtn')) rmTask(e);
    if (e.target.classList.contains('task')) markTask(e);
}

function rmTask(e) {
    e.target.parentElement.remove();
}

function markTask(e) {
    e.target.classList.toggle('taskDone');
    e.target.firstChild.classList.toggle('hidden');
}

