const container = document.getElementById('container');
const gallery = container.children[0];
const background = container.children[1];
const fullImg = container.children[2];
const imgTemp = document.getElementById('imgTemp').innerHTML.trim();
const closeBtn = document.querySelector('.closeBtn');
const prom = fetch('https://jsonplaceholder.typicode.com/photos?_limit=50');

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
            createImages(data, container);
        });
    }); 
}

function createImages(json, elem) {
    return json.map((item) => {
        let newImg = document.createElement('div');
        newImg.innerHTML = imgTemp.replace('{{thumbURL}}', item.thumbnailUrl)
                                  .replace('{{title}}', item.title)
                                  .replace('{{fullURL}}', item.url)
                                  .replace('{{index}}', item.id);
        elem.firstElementChild.append(newImg);
    })
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
    elems.forEach( (elem) => elem.classList.add('hidden') );
}

function closeImg() {
    hide(background, fullImg);
}