const CLASS_SIDEBAR_CONTAINER = 'sidebar';
const CLASS_SIDEBAR_LIST = 'sidebar-list';
const CLASS_SIDEBAR_USER = 'sidebar-user';
const CLASS_ACTIVE = 'active';
const CLASS_SAVE_BTN = 'save-button';
const CLASS_REMOVE_BTN = 'remove-button';

const SIDEBAR_USER_TEMPLATE = document.getElementById('sidebarUser').innerHTML.trim();
const SAVE_BTN_TEMPLATE = document.getElementById('saveChangesBtn').innerHTML.trim();

const SIDEBAR_CONTAINER = document.getElementById('sidebar');
const SIDEBAR_LIST = SIDEBAR_CONTAINER.firstElementChild;
const NEW_CONTACT_BTN = document.getElementById('newContactBtn');
const REMOVE_CONTACT_BTN = document.querySelector('.remove-button');
const MAIN_CONTAINER = document.getElementById('main');

const MAIN_FORM = document.getElementById('form');
const NAME_INPUT = document.getElementById('name');
const COMPANY_INPUT = document.getElementById('companyname');
const WEBSITE_INPUT = document.getElementById('website');
const PHONE_INPUT = document.getElementById('phone');
const EMAIL_INPUT = document.getElementById('email');

const INPUTS = {
    name: document.getElementById('name'),
    company: document.getElementById('companyname'),
    website: document.getElementById('website'),
    phone: document.getElementById('phone'),
    email: document.getElementById('email')
}

const USER_DATA_URL = 'https://jsonplaceholder.typicode.com/users';

init();

function init() {
    fetch(USER_DATA_URL)
        .then(resp => resp.json())
        .then(data => {
            createSidebar(data, SIDEBAR_LIST);
            bindEventListeners();
            renderForm();
        });
}

function createSidebar(json, elem) {
    createUserList(json, elem);
    adjustClasses(elem.children, CLASS_SIDEBAR_USER);

    elem.classList.add(CLASS_SIDEBAR_LIST);
    elem.parentElement.classList.add(CLASS_SIDEBAR_CONTAINER);
}

function createUserList(json, elem) {
    let listData = json.map(item => {
        return SIDEBAR_USER_TEMPLATE
            .replace('{{id}}', item.id)
            .replace('{{name}}', item.name);
    })

    elem.innerHTML = listData.join(`\n`);
}

function adjustClasses(collection, addClass) {
    Array.prototype.forEach.call(collection, item => item.classList.add(addClass))
}

function bindEventListeners() {
    SIDEBAR_CONTAINER.addEventListener('click', onUserClick);
    NEW_CONTACT_BTN.addEventListener('click', onNewUserBtnClick);
    MAIN_FORM.addEventListener('click', onSaveBtnClick);
    MAIN_CONTAINER.addEventListener('click', onRemoveBtnClick);
}

function renderForm(data) {
    
    if(!data){
        return MAIN_FORM.reset();
    } else {
        INPUTS.name.value = data.name;
        INPUTS.company.value = data.company.name;
        INPUTS.website.value = data.website;
        INPUTS.phone.value = data.phone;
        INPUTS.email.value = data.email;
    }
}


function onUserClick(e) {
    if (e.target.classList.contains(CLASS_SIDEBAR_USER)) {
        REMOVE_CONTACT_BTN.classList.remove('hidden');
        addAttributes(MAIN_FORM, 'disabled', '');
        highlightActiveItem(e.target);
        
        fetch(`${USER_DATA_URL}/${e.target.dataset.userId}`)
        .then(resp => resp.json())
        .then(data => {
            if(MAIN_FORM.lastElementChild.tagName == 'BUTTON') {
                MAIN_FORM.lastElementChild.remove();
            }
            renderForm(data);
        })
    }
}

function onNewUserBtnClick(e){
    REMOVE_CONTACT_BTN.classList.add('hidden');
    renderForm(null);
    removeAttributes(MAIN_FORM, 'disabled');
    highlightActiveItem(null);
    appendSaveBtn(MAIN_FORM);
}

function onSaveBtnClick(e) {
    e.preventDefault();

    if (e.target.classList.contains(CLASS_SAVE_BTN)) {
        
        let data = {
            name: INPUTS.name.value,
            company: INPUTS.company.value,
            website: INPUTS.website.value,
            phone: INPUTS.phone.value,
            email: INPUTS.email.value
        };

        fetch(USER_DATA_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        })
        .then(result => alert(`Status: ${result.status}`));
        
        MAIN_FORM.reset();
    }
}

function onRemoveBtnClick(e) {
    
    if (e.target.classList.contains(CLASS_REMOVE_BTN)) {
        Array.prototype.forEach.call(SIDEBAR_LIST.children,
            item => {
                if(item.classList.contains(CLASS_ACTIVE)) {
                    item.remove();
                    MAIN_FORM.reset();
                    return
                }
            })
    }
}

function removeAttributes(collection, attr) {
    Array.prototype.forEach.call(collection, item => item.removeAttribute(attr))
}

function addAttributes(collection, attr, value) {
    Array.prototype.forEach.call(collection, item => {
        if (item.tagName == 'INPUT') {
            item.setAttribute(attr, value);
        }
    })
}

function highlightActiveItem(target) {
    Array.prototype.forEach.call(SIDEBAR_LIST.children, 
        item => item.classList.remove(CLASS_ACTIVE));
    if (target) target.classList.add(CLASS_ACTIVE);
}

function appendSaveBtn(elem) {
    if (!elem.lastElementChild.classList.contains(CLASS_SAVE_BTN)) {
        elem.insertAdjacentHTML('beforeend', SAVE_BTN_TEMPLATE);
    }
}
