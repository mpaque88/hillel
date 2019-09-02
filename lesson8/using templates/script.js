'use strict'

const list = document.getElementById('list');
const count = document.getElementById('count');
const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', newLi);
const liTemplate = document.getElementById('liTemplate').innerHTML;

function newLi() {
    createList();    
}

function createList() {
    const num = +count.value || 0;
    let template = '';
    
    for (let i = 1; i < num + 1; i++) {
        template += createLi(i);
    }

    list.innerHTML = template;
}

function createLi(index) {
    return liTemplate.replace('{{index}}', index);
}