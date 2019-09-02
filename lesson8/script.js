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
    
    if (num) {
        for (let i = 1; i < num + 1; i++) {
            let node = document.createElement('li');
            let textNode = document.createTextNode(i);
            
            node.appendChild(textNode);
            node.setAttribute(`data-li-index`, i);
            list.appendChild(node);
        }
    }
}