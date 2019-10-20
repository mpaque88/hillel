const IMG_TEMPLATE = document.getElementById('imgTemp').innerHTML.trim();
const PAGE_TEMPLATE = document.getElementById('pageTemp').innerHTML.trim();
const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos?_limit=150';

const LAST_VISITED = 'lastActivePageId';
const PHOTOS_PER_PAGE = 'photosPerPage';

const ACTIVE_CLASS = 'active';
const HIDDEN_CLASS = 'hidden';
const IMG_DIV_CLASS = 'gallery-img';

const DEFAULT_PHOTOS_PER_PAGE = 50;

const container = document.getElementById('container');
const gallery = document.getElementById('gallery');
const background = document.getElementById('background');
const fullImage = document.getElementById('full-image');
const closeBtn = document.getElementById('closeBtn');
const paginationContainer = document.getElementById('pagination-container');
const amountFilter = document.getElementById('amount-filter');

let photosQuantity = 0;
let pagesQuantity = 0;
let imagesData = [];

init();

function init() {
    createGallery();
    bindEventListeners();
    adjustClass('add', HIDDEN_CLASS, [background, fullImage]);
}

function createGallery(){
    requestJson(PHOTOS_URL)
        .then((data) => {
            imagesData = data;

            setDefaultValues();
            calculatePagination(data);
            createPagination();
            renderImages( calculatePage( data, localStorage.lastActivePageId ), gallery );
            
            highlightActivePage(localStorage.lastActivePageId - 1);
            highlightActiveFilter();
        });
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
            .replace('{{id}}', i + 1)
            .replace('{{value}}', i + 1));
        }

    paginationContainer.innerHTML = pages.join('');
}

function bindEventListeners() {
    gallery.addEventListener('click', showImg);
    background.addEventListener('click', closeImg);
    closeBtn.addEventListener('click', closeImg);
    paginationContainer.addEventListener('click', onPageListClick);
    amountFilter.addEventListener('change', onAmountChange);
}

function showImg(e) {
    if (e.target.classList.contains(IMG_DIV_CLASS)) {
        adjustClass('remove', HIDDEN_CLASS, [background, fullImage]);

        fullImage.firstElementChild.src = e.target.dataset.fullUrl;
        fullImage.firstElementChild.alt = e.target.alt;
        fullImage.firstElementChild.setAttribute('data-index', e.target.dataset.index);
    }
}

function onAmountChange() {
    localStorage.photosPerPage = amountFilter.value;
    resetActivePage();
    createGallery();
}

function onPageListClick(e) {
    const id = e.target.dataset.pageId;
    
    if (id) {
        adjustClass('remove', ACTIVE_CLASS, paginationContainer.children);
        e.target.classList.add(ACTIVE_CLASS);

        renderImages( calculatePage( imagesData, id ), gallery );
        localStorage.setItem(LAST_VISITED, id);
    }
}

function calculatePage(data, id) {
    return data.slice(localStorage.photosPerPage * (id - 1), localStorage.photosPerPage * id);
}

function adjustClass(mode, className, collection) {
    Array.prototype.forEach.call(collection, elem => {
        if (mode == 'add') elem.classList.add(className);
        if (mode == 'remove') elem.classList.remove(className);
    });
}

function closeImg() {
    adjustClass('add', HIDDEN_CLASS, [background, fullImage]);
}

function requestJson(url, method = 'GET', body = null) {
    return fetch(url, { method, body })
            .then(resp => resp.json())
            .catch(err => console.warn(err));
}

function calculatePagination(contentArray) {
    photosQuantity = contentArray.length;
    pagesQuantity = Math.ceil(photosQuantity/localStorage.photosPerPage);
}

function saveActivePage(id) {
    localStorage.setItem(LAST_VISITED, id);
}

function highlightActivePage(id) {
    paginationContainer.children[id].classList.add(ACTIVE_CLASS);
}

function highlightActiveFilter() {
    amountFilter.value = localStorage.photosPerPage;
}

function resetItemsPerPage() {
    localStorage.setItem(PHOTOS_PER_PAGE, DEFAULT_PHOTOS_PER_PAGE);
}

function resetActivePage() {
    localStorage.setItem(LAST_VISITED, '1');
}

function setDefaultValues() {
    if (!localStorage.photosPerPage) resetItemsPerPage();
    if (!localStorage.lastActivePageId) resetActivePage();
}