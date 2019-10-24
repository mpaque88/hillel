const container = document.getElementById('container');
const gallery = document.getElementById('gallery');
const background = document.getElementById('background');
const fullImg = document.getElementById('full-image');

const IMG_TEMPLATE = document.getElementById('imgTemp').innerHTML.trim();
const closeBtn = document.getElementById('closeBtn');
const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos?_limit=50';

createGallery();
bindEventListeners();
hide(background, fullImg);

function bindEventListeners() {
    gallery.addEventListener('click', showImg);
    background.addEventListener('click', closeImg);
    closeBtn.addEventListener('click', closeImg);
}

function createGallery(){
    requestJson(PHOTOS_URL)
        .then((data) => {
            appendImages(data, gallery);

        });
}

function appendImages(json, elem) {
    let images = json.map(item => {
        return IMG_TEMPLATE
            .replace('{{thumbURL}}', item.thumbnailUrl)
            .replace('{{title}}', item.title)
            .replace('{{fullURL}}', item.url)
            .replace('{{index}}', item.id);
    })

    elem.innerHTML = images.join('');
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

function hide(...elems) {
    elems.forEach((elem) => elem.classList.add('hidden'));
}

function closeImg() {
    hide(background, fullImg);
}

function requestJson(url, method = 'GET', body = null) {
    return fetch(url, { method, body })
            .then(resp => resp.json())
            .catch(err => console.warn(err))
}