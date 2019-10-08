const container = document.getElementById('container');
const gallery = container.children[0];
const background = container.children[1];
const fullImg = container.children[2];
const imgTemp = document.getElementById('imgTemp').innerHTML.trim();

hide(container.children[1], container.children[2]);


const prom = fetch('https://jsonplaceholder.typicode.com/photos?_limit=50');
let photos;

prom.then((resp) => {
    resp.json().then((data) => {
        photos = data;

        for( let i = 0; i < photos.length; i++ ) {
            let newImg = document.createElement('div');
            newImg.innerHTML = imgTemp.replace('{{thumbURL}}', photos[i].thumbnailUrl)
                                      .replace('{{title}}', photos[i].title)
                                      .replace('{{fullURL}}', photos[i].url)
                                      .replace('{{index}}', photos[i].id);

            newImg.firstElementChild.classList.add('gallery-img');
            container.firstElementChild.append(newImg);
        }
    });
});

gallery.addEventListener('click', showImg);
background.addEventListener('click', closeImg);

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


// - close btn
// - next/prev btns
// - code style
// - css