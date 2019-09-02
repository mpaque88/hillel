'use strict'

let links = document.querySelectorAll('a');

for (let i = 0; i < links.length; i++) {
    let a = links[i];
    let href = a.getAttribute('href');

    if (!href) continue; // нет атрибута
    if (href.indexOf('://') == -1) continue; // без протокола
    if (href.indexOf('http://internal.com') === 0) continue; // внутренняя

    a.classList.add('external');
}

//solution 2 (using CSS)

// ищем все ссылки, у которых в href есть протокол,
// но адрес начинается не с http://internal.com

// var css = 'a[href*="://"]:not([href^="http://internal.com"])';
// var links = document.querySelectorAll(css);

// for (var i = 0; i < links.length; i++) {
//     links[i].classList.add('external');
// }