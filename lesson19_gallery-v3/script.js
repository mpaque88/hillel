const IMG_TEMPLATE = document.getElementById('imgTemp').innerHTML.trim();
const PAGE_TEMPLATE = document.getElementById('pageTemp').innerHTML.trim();
const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos?_limit=150';

const ACTIVE_CLASS = 'active';
// const LOADING_CLASS = 'loading';

const PHOTOS_PER_PAGE = 50;
let photosQuantity = 0;
let pagesQuantity = 0;

const container = document.getElementById('container');
const gallery = document.getElementById('gallery');
const background = document.getElementById('background');
const fullImage = document.getElementById('full-image');
const closeBtn = document.getElementById('closeBtn');
const paginationList = document.getElementById('pagination-list');

let imagesData = [];

init();

function init() {
    createGallery();
    bindEventListeners();
    hide(background, fullImage);
}

function bindEventListeners() {
    gallery.addEventListener('click', showImg);
    background.addEventListener('click', closeImg);
    closeBtn.addEventListener('click', closeImg);
    paginationList.addEventListener('click', onPageListClick);
}

function createGallery(){
    requestJson(PHOTOS_URL)
        .then((data) => {
            imagesData = data;

            calculatePagination(data);
            renderImages( calculatePage(data), gallery );
            createPagination();
            paginationList.children[0].classList.add(ACTIVE_CLASS);
        });
}

function calculatePage(data, start = 0, finish = PHOTOS_PER_PAGE) {
    return data.slice(start, finish);
}

function renderImages(json, elem) {
    let images = json.map(item => {
        return IMG_TEMPLATE
            .replace('{{thumbURL}}', item.thumbnailUrl)
            .replace('{{title}}', item.title)
            .replace('{{fullURL}}', item.url)
            .replace('{{index}}', item.id);
    })

    elem.innerHTML = images.join('');
}

function createPagination() {
    let pages = [];

    for (let i = 0; i < pagesQuantity; i++) {
        pages.push(PAGE_TEMPLATE
            .replace('{{id}}', i+1)
            .replace('{{value}}', i+1));
    }

    paginationList.innerHTML = pages.join('');
}

function showImg(e) {
    if(e.target.classList.contains('gallery-img')) {
        show(background, fullImage);

        fullImage.firstElementChild.src = e.target.dataset.fullUrl;
        fullImage.firstElementChild.alt = e.target.alt;
        fullImage.firstElementChild.setAttribute('data-index', e.target.dataset.index);
    }
}

function onPageListClick(e) {
    let id = e.target.dataset.pageId;

    if (id) {

        removeClass(ACTIVE_CLASS, paginationList.children)
        e.target.classList.add(ACTIVE_CLASS);
        
        if (id == 1) {
            renderImages(calculatePage(imagesData), gallery);
        } else {
            renderImages(
                calculatePage(imagesData, PHOTOS_PER_PAGE * (id - 1), PHOTOS_PER_PAGE * id),
                gallery
            );
        }
    }
}

function hide(...elems) {
    elems.forEach((elem) => elem.classList.add('hidden'));
}

function show(...elems) {
    elems.forEach((elem) => elem.classList.remove('hidden'));
}

//// 1 - rename removeClass ?
//// 2 - replace hide with removeClass ?

function removeClass(className, collection) {
    Array.prototype.forEach.call(collection, elem => elem.classList.remove(className));
}

function closeImg() {
    hide(background, fullImage);
}

function requestJson(url, method = 'GET', body = null) {
    // gallery.classList.add(LOADING_CLASS);
    return fetch(url, { method, body })
            .then(resp => resp.json())
            .catch(err => console.warn(err))
            // .finally(() => gallery.classList.remove(LOADING_CLASS));
}

function calculatePagination(contentArray) {
    photosQuantity = contentArray.length;
    pagesQuantity = Math.ceil(photosQuantity/PHOTOS_PER_PAGE);
}



// 1)  ~DONE~ 
// ~DONE~ paging - fetch 500 items; make paging 
// ~DONE~ (ITEMS_PER_PAGE, page quantity = (images.length/itemsperpage))

// 2) 
// store last visited page 

// (dataset.pageId, localStorage.lastVisited == pageId)
//             renderImages(
//     calculatePage(imagesData, PHOTOS_PER_PAGE * (pageId - 1), PHOTOS_PER_PAGE * pageId),
//     gallery
// );

// ! ! ! ! !
// calculatePage(imagesData, PHOTOS_PER_PAGE * (pageId - 1), PHOTOS_PER_PAGE * pageId)-> create method "getPageData"
