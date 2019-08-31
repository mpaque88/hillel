'use strict'

const list = document.getElementById('list');
const count = document.getElementById('count');
const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', newLi);

function newLi() {
    let num = +count.value;
    list.innerHTML = '';

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

