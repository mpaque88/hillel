'use strict'

// class Gallery {

// }

// const myGallery = new Gallery(
//     document.getElementById('images-container')
// )


const images = document.getElementById('images');
const controls = document.getElementById('controls');

const arrowPrev = document.createElement('button');
arrowPrev.innerHTML = '&#10229;';
arrowPrev.classList.add('arrow', 'left');
controls.appendChild(arrowPrev);

arrowPrev.addEventListener('click', imgPrev);

const arrowNext = document.createElement('button');
arrowNext.innerHTML = '&#10230;';
arrowNext.classList.add('arrow', 'right');
controls.appendChild(arrowNext);

arrowNext.addEventListener('click', imgNext);


function imgNext () {
    const gallery = document.getElementById('images');
    let currentImg = document.querySelector('.shown');
    let nextImg = currentImg.nextElementSibling;
    

    if (!nextImg) {
        currentImg.classList.remove('shown');
        currentImg.classList.add('hidden');

        gallery.firstElementChild.classList.remove('hidden');
        gallery.firstElementChild.classList.add('shown');
    } else {
        currentImg.classList.remove('shown');
        currentImg.classList.add('hidden');
    
        nextImg.classList.add('shown');
        nextImg.classList.remove('hidden');
    }
}

function imgPrev () {
    const gallery = document.getElementById('images');
    let currentImg = document.querySelector('.shown');
    let prevImg = currentImg.previousElementSibling;

    if (!prevImg) {
        currentImg.classList.remove('shown');
        currentImg.classList.add('hidden');

        gallery.lastElementChild.classList.remove('hidden')
        gallery.lastElementChild.classList.add('shown')
    } else {
        currentImg.classList.remove('shown');
        currentImg.classList.add('hidden');

        prevImg.classList.add('shown');
        prevImg.classList.remove('hidden');
    }
}

// setInterval(imgNext, 8000);











// myGallery.show(2);
// myGallery.next();
// myGallery.prev();