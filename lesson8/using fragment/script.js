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
    const num = +count.value || 0;
    const fragment = document.createDocumentFragment();
    
    for (let i = 1; i < num + 1; i++) {
        let newLi = createLi(i);
        fragment.appendChild(newLi);
        //fragment improves perfomance
    }

    list.appendChild(fragment);
}

function createLi(index) {
    let node = document.createElement('li');
    let textNode = document.createTextNode(index);
    node.appendChild(textNode);
    node.setAttribute(`data-li-index`, index);
    return node;
}