'use strict'

const list = document.getElementById('list');
const count = document.getElementById('count');
const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', newLi);

function newLi() {
    clearList();
    createList();    
}

function clearList() {
    list.innerHTML = '';
}

function createList() {
    let num = +count.value || 0;
    
    for (let i = 1; i < num + 1; i++) {
        let newLi = createLi(i);
        list.appendChild(newLi);
    }
}

function createLi(index) {
    let node = document.createElement('li');
    let textNode = document.createTextNode(index);
    node.appendChild(textNode);
    node.setAttribute(`data-li-index`, index);
    return node;
}