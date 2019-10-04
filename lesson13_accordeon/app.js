'use strict'

class Gallery {
    constructor(images) {
        this.images = images;
        this.create = this.createGallery();
    }

    createGallery() {
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('photo-gallery-container');

        const galleryDiv = document.createElement('div');
        galleryDiv.classList.add('photo-gallery');

        galleryDiv.appendChild(this.images);
        this.adjustClasses(this.images);
        this.createButtons(galleryDiv);

        containerDiv.appendChild(galleryDiv);
        document.body.append(containerDiv);

        setInterval(this.next, 3000);
    }

    adjustClasses(imagesList) {
        for (let key in imagesList.children) {
            if (imagesList.children[key].tagName != 'LI') {
                break;
            } else {
                imagesList.children[key].classList.add('hidden');
            }
        }

        imagesList.children[0].classList.toggle('hidden');
    }

    createButtons(container) {
        let nextBtn = document.createElement('button');
        nextBtn.classList.add('btn-next');
        nextBtn.innerText = '>';

        let prevBtn = document.createElement('button');
        prevBtn.classList.add('btn-prev');
        prevBtn.innerHTML = '<';

        nextBtn.addEventListener('click', this.next);
        prevBtn.addEventListener('click', this.prev);

        container.prepend(prevBtn);
        container.append(nextBtn);
    }

    next() {
        const activeImg = document.querySelector('.photo-gallery li:not(.hidden)');
        const imgContainer = document.querySelector('.photo-gallery ul');

        activeImg.classList.toggle('hidden');

        if (!activeImg.nextElementSibling) {
            imgContainer.firstElementChild.classList.toggle('hidden');
        } else {
            activeImg.nextElementSibling.classList.toggle('hidden');
        }
    }


    prev() {
        const activeImg = document.querySelector('.photo-gallery li:not(.hidden)');
        const imgContainer = document.querySelector('.photo-gallery ul');

        activeImg.classList.toggle('hidden');

        if (!activeImg.previousElementSibling) {
            imgContainer.lastElementChild.classList.toggle('hidden');
        } else {
            activeImg.previousElementSibling.classList.toggle('hidden');
        }
    }

    show(num) {
        const activeImg = document.querySelector('.photo-gallery li:not(.hidden)');
        const list = this.images.children;

        if (list[num]) {
            activeImg.classList.toggle('hidden');
            list[num].classList.toggle('hidden');
        }
    }
}

const myGallery = new Gallery(
    document.getElementById('container')
)
