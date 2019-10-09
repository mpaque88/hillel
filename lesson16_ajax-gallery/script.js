const container = document.getElementById('container');
const gallery = container.children[0];
const background = container.children[1];
const fullImg = container.children[2];
const imgTemp = document.getElementById('imgTemp').innerHTML.trim();
const closeBtn = document.querySelector('.closeBtn');
const prom = fetch('https://jsonplaceholder.typicode.com/photos?_limit=50');
let photos = [];

createGallery();
bindEventListeners();
hide(background, fullImg);

function bindEventListeners() {
    gallery.addEventListener('click', showImg);
    background.addEventListener('click', closeImg);
    closeBtn.addEventListener('click', closeImg);
}

function createGallery(){
    prom.then((resp) => { resp.json().then((data) => {
            photos = data;
            createImages(photos, container);
        });
    }); 
}

function createImages(json, elem) {
    for( let i = 0; i < json.length; i++ ) {
        let newImg = document.createElement('div');
        newImg.innerHTML = imgTemp.replace('{{thumbURL}}', json[i].thumbnailUrl)
                                  .replace('{{title}}', json[i].title)
                                  .replace('{{fullURL}}', json[i].url)
                                  .replace('{{index}}', json[i].id);

        newImg.firstElementChild.classList.add('gallery-img');
        elem.firstElementChild.append(newImg);
    }
}

function showImg(e) {
    if(e.target.classList.contains('gallery-img')) {
        background.classList.remove('hidden');
        fullImg.classList.remove('hidden');

        fullImg.firstElementChild.src = e.target.dataset.fullUrl;
        fullImg.firstElementChild.alt = e.target.alt;
        fullImg.firstElementChild.setAttribute('data-index', e.target.dataset.index);
    }
}

function setAttributes(elem, obj) {
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            elem[prop] = obj[prop];
        }
    }
}

function hide(...elems) {
    elems.forEach( (elem) => elem.classList.add('hidden') );
}

function closeImg() {
    hide(background, fullImg);
}