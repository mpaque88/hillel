const REMOVE_BUTTON_CLASS = 'remove-button';
const EDIT_BUTTON_CLASS = 'edit-button';
const EDIT_MODE_CLASS = 'edit-mode';
const LOCAL_DATA_KEY = 'myStickers';

const mainContainer = document.getElementById('main-container');
const stickerContainer = document.getElementById('sticker-container');
const addBtn = document.getElementById('add-button');

const stickerTemplate = document.getElementById('sticker-template').innerHTML.trim();

let stickerListHtml = [];
let stickerListItems = [];

addBtn.addEventListener('click', onAddBtnClick);
stickerContainer.addEventListener('click', onStickerClick);

init();

function init() {
    if (localStorage.myStickers) {
        stickerListItems = JSON.parse(localStorage.myStickers);
    } else {
        localStorage.myStickers = [];
        stickerListItems = [];
    }
    
    renderStickersFromList(stickerListItems);
}

function renderStickersFromList(stickers) {
    if (stickers) {
        stickerListHtml = stickers.map((sticker) => {
            return stickerTemplate
                .replace('{{id}}', sticker.id)
                .replace('{{title}}', sticker.title)
                .replace('{{body}}', sticker.body)
        });

        stickerContainer.innerHTML = stickerListHtml.join('\n');
    }
}

function onAddBtnClick() {
    addNewStickerItem();
    renderStickersFromList(stickerListItems);
}

function addNewStickerItem() {
    const sticker = {
        id: Date.now(),
        title: 'Do something',
        body: 'Some details here',
        editMode: false
    }

    stickerListItems.push(sticker);
    updateLocalData(stickerListItems);
}

function onStickerClick(e) {
    const id = e.target.parentElement.dataset.stickerId;
    const stickerItem = getListItemElement(id);
    

    switch (true) {
        case e.target.classList.contains(REMOVE_BUTTON_CLASS): 
            removeSticker(id); 
            break;
        case e.target.classList.contains(EDIT_BUTTON_CLASS): {
            
            console.dir(stickerItem.editMode);
            if (stickerItem.editMode == true) { 




                saveItem(stickerItem)




            } else {




                editModeOn(id);





                
            }
        }; break;
    }
}

function removeSticker(id) {   
    removeElementNode(id);
    removeItemFromList(id, stickerListItems)
    updateLocalData(stickerListItems);
}

function removeElementNode(id) {
    const elem = findElementNode(id);

    elem && elem.remove();
}

function removeItemFromList(id, list) {
    let itemIndex = list.findIndex(item => item.id == id);

    list.splice(itemIndex, 1);
}



function getListItemElement(id) {
    const list = JSON.parse(localStorage.myStickers)
    return list.find(item => item.id == id);
}

function findElementNode(id) {
    return document.querySelector(`[data-sticker-id="${id}"`);
}









function saveItem(item) {
    updateItemInList(item, stickerListItems);
    updateLocalData(stickerListItems)
    renderStickersFromList(stickerListItems);
}



function editModeOn(id) {

    
}














function updateItemInList(item, list) {
    let itemIndex = list.findIndex(el => el.id == item.id);

    list[itemIndex] = item;
}

function updateLocalData(list) {
    localStorage.myStickers = JSON.stringify(list);
}

function getListFromJson(key) {
    return JSON.parse(localStorage.getItem(key));
}