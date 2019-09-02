'use strict'

//run the loop via console
for (let x of document.querySelectorAll('li')) {
    let title = x.firstChild.data.trim();
    let count = x.getElementsByTagName('li').length;

    console.log(title + ': ' + count);
}
