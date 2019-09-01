'use strict'

const list = document.getElementById('list');
const count = document.getElementById('count');
const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', newLi);

function newLi() {
    list.innerHTML = '';

    let num = +count.value;
    if (num) for (let i = 1; i < num + 1; i++) createLi(i);
}

function createLi(index) {
    let node = document.createElement('li');
    let textNode = document.createTextNode(index);
    
    node.appendChild(textNode);
    node.setAttribute(`data-li-index`, index);
    list.appendChild(node);
}