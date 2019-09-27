class Gallery {
    constructor(images) {
        this.images = images;
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
        
        setInterval(this.next, 5000);
    }

    adjustClasses(imagesList) {

        for (let key in imagesList.children) {

            if (imagesList.children[key].tagName != 'LI') break;

            if (imagesList.children[key] == imagesList.firstElementChild) {
                imagesList.children[key].classList.add('active');
            } else {
                imagesList.children[key].classList.add('hidden');
            }
        }
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
        const activeImg = document.querySelector('.active');
        const nextImg = activeImg.nextElementSibling;
        const gallery = document.getElementById('container')

        if (!nextImg) {
            activeImg.classList.remove('active');
            activeImg.classList.add('hidden');

            gallery.firstElementChild.classList.remove('hidden');
            gallery.firstElementChild.classList.add('active');
        } else {
            activeImg.classList.remove('active');
            activeImg.classList.add('hidden');
            
            nextImg.classList.add('active');
            nextImg.classList.remove('hidden');
        }
    }

    prev() {
        const activeImg = document.querySelector('.active');
        const prevImg = activeImg.previousElementSibling;
        const gallery = document.getElementById('container')
        
        if (!prevImg) {
            activeImg.classList.remove('active');
            activeImg.classList.add('hidden');
            
            gallery.lastElementChild.classList.remove('hidden');
            gallery.lastElementChild.classList.add('active');
        } else {
            activeImg.classList.remove('active');
            activeImg.classList.add('hidden');
            
            prevImg.classList.add('active');
            prevImg.classList.remove('hidden');
        }
    }
    
    show(num) {
        const activeImg = document.querySelector('.active');
        const list = this.images.children;

        if (list[num]) {
            activeImg.classList.remove('active');
            activeImg.classList.add('hidden');

            list[num].classList.remove('hidden');
            list[num].classList.add('active');
        } 
    }
}

const myGallery = new Gallery(
    document.getElementById('container')
)

