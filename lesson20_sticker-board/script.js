const REMOVE_BUTTON_CLASS = 'remove-button';
const EDIT_BUTTON_CLASS = 'edit-button';
const EDIT_MODE_CLASS = 'edit-mode';
const LOCAL_DATA_KEY = 'myStickers';

const mainContainer = document.getElementById('main-container');
const stickerContainer = document.getElementById('sticker-container');
const addBtn = document.getElementById('add-button');

const stickerTemplate = document.getElementById('sticker-template').innerHTML.trim();

let stickerListHtml = [];

addBtn.addEventListener('click', onAddBtnClick);
stickerContainer.addEventListener('click', onStickerClick);

init();

function init() {
    if (!localStorage.myStickers) 
        localStorage.myStickers = [];
      
    renderList(localStorage.myStickers);
}

function renderList(json) {
    
    if (json) {
        list = JSON.parse(json);

        stickerListHtml = list.map((sticker) => {
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
    renderList(localStorage.myStickers);
}

function addNewStickerItem() {
    const sticker = {
        id: Date.now(),
        title: 'Do something',
        body: 'Some details here'
    }

    if (!localStorage.myStickers) {
        let list = [];
        list.push(sticker);
        localStorage.myStickers = JSON.stringify(list);
    } else {
        let list = getListFromJson(LOCAL_DATA_KEY);
        list.push(sticker);
        localStorage.myStickers = JSON.stringify(list);
    }
}

function onStickerClick(e) {
    const id = e.target.parentElement.dataset.stickerId;

    switch (true) {
        case e.target.classList.contains(REMOVE_BUTTON_CLASS): 
            removeSticker(id); 
            break;
        case e.target.classList.contains(EDIT_BUTTON_CLASS): { 
            toggleEditButtonText(e.target);
            toggleEditMode(id);
        }; break;
    }
}

function removeSticker(id) {   
    const sticker = getListItemElement(id);
    
    removeStickerData(sticker.id);
    removeElementNode(sticker.id)
}

function getListItemElement(id) {
    const list = JSON.parse(localStorage.myStickers)
    return list.find(item => item.id == id);
}

function removeStickerData(id) {
    let list = getListFromJson(LOCAL_DATA_KEY);
    const sticker = getListItemElement(id);

    list = list.filter(item => item.id != sticker.id);
    localStorage.setItem(LOCAL_DATA_KEY, JSON.stringify(list));
}

function removeElementNode(id) {
    const elem = findElementNode(id);

    elem && elem.remove();
}

function findElementNode(id) {
    return document.querySelector(`[data-sticker-id="${id}"`);
}

function toggleEditMode(id) {
    const stickerNode = findElementNode(id);
    const input = stickerNode.children[0][0];           
    const textarea = stickerNode.children[0][1];       
    
    if (stickerNode.classList.contains(EDIT_MODE_CLASS)) {
        const stickerItem = getListItemElement(id);
        stickerItem.title = input.value;
        stickerItem.body = textarea.value;

        saveSticker(stickerItem);
        editModeOff(input, textarea, stickerNode);
    } else {
        editModeOn(input, textarea, stickerNode);
    }
}

function toggleEditButtonText(btn) {
    btn.innerHTML == 'Edit' ? btn.innerHTML = 'Save' : btn.innerHTML = 'Edit';
}

function editModeOff(title, body, container) {
    title.disabled = true;
    body.readOnly = true;
    container.classList.remove(EDIT_MODE_CLASS);
}

function editModeOn(title, body, container) {
    title.disabled = false;
    body.readOnly = false;
    container.classList.add(EDIT_MODE_CLASS);
}

function saveSticker(item) {
    let list = getListFromJson(LOCAL_DATA_KEY);

    list[list.findIndex(el => el.id == item.id)] = item;

    localStorage.setItem(LOCAL_DATA_KEY, JSON.stringify(list));
}

function getListFromJson(key) {
    return JSON.parse(localStorage.getItem(key));
}