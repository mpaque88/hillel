'use strict'

const menuElem = document.getElementById('sweets');
const titleElem = document.getElementById('titleExp');
titleElem.addEventListener('click', titleOnClick);


function titleOnClick() {
    menuElem.classList.toggle('open');
};