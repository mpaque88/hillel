class Gallery {
    constructor(images) {
        this.images = images;
        this.interval = setInterval(this.next, 5000);
    }

    createGallery() {
        let newDiv = document.createElement('div');

        newDiv.appendChild(this.images);

        this.adjustClasses(newDiv, this.images);

        this.createButtons(newDiv);

        document.body.appendChild(newDiv);
    }

    adjustClasses(container, list) {
        container.classList.add('myGallery');

        for (let key in list.children) {

            if (list.children[key].tagName != 'LI') break;

            if (list.children[key] == list.firstElementChild) {
                list.children[key].classList.add('active');
            } else {
                list.children[key].classList.add('hidden');
            }
        }
    }

    createButtons(container) {
        let nextBtn = document.createElement('button');
        nextBtn.innerText = 'Next';

        let prevBtn = document.createElement('button');
        prevBtn.innerHTML = 'Prev';

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


// 1 - add buttons - DONE
// 2 - add listeners to buttons - DONE
// 3 - add interval - DONE

// myGallery.show(2);
// myGallery.next(); - DONE
// myGallery.prev(); - DONE


// - - - - - - in progress

// styling

