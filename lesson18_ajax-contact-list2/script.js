const CLASS_SIDEBAR_USER = 'sidebar-user';
const CLASS_ACTIVE = 'active';
const CLASS_SAVE_BTN = 'save-button';
const CLASS_REMOVE_BTN = 'remove-button';

const TEMPLATE_SIDEBAR_USER = document.getElementById('sidebarUser').innerHTML.trim();
const TEMPLATE_SAVE_BTN = document.getElementById('saveChangesBtn').innerHTML.trim();

const URL_USER_DATA = 'https://jsonplaceholder.typicode.com/users';

const sidebarContainer = document.getElementById('sidebar');
const sidebarList = document.getElementById('sidebar-list');
const newContactBtn = document.getElementById('newContactBtn');

const removeContactBtn = document.querySelector('.remove-button');
const saveContactBtn = document.querySelector('.save-button');

const mainForm = document.getElementById('form');
const mainInputs = {
    name: document.getElementById('name'),
    company: document.getElementById('companyname'),
    website: document.getElementById('website'),
    phone: document.getElementById('phone'),
    email: document.getElementById('email')
}

init();

function init() {
    getJson(URL_USER_DATA).then(data => {
        createSidebar(data, sidebarList);
        renderForm();
        bindEventListeners();
    });
}

function createSidebar(json, elem) {
    let listData = json.map(item => {
        return TEMPLATE_SIDEBAR_USER
            .replace('{{id}}', item.id)
            .replace('{{name}}', item.name);
    })

    elem.innerHTML = listData.join(`\n`);
}

function renderForm(data) {
    if (!data) {
        return mainForm.reset();
    } else {
        mainInputs.name.value = data.name;
        mainInputs.company.value = data.company.name;
        mainInputs.website.value = data.website;
        mainInputs.phone.value = data.phone;
        mainInputs.email.value = data.email;
    }
}

function bindEventListeners() {
    sidebarContainer.addEventListener('click', onUserClick);
    newContactBtn.addEventListener('click', onNewUserBtnClick);
    saveContactBtn.addEventListener('click', onSaveBtnClick);
    removeContactBtn.addEventListener('click', onRemoveBtnClick);
}

function onUserClick(e) {
    if (e.target.classList.contains(CLASS_SIDEBAR_USER)) {
        saveContactBtn.classList.add('hidden');
        removeContactBtn.classList.remove('hidden');

        addAttributes(mainForm, 'disabled', '');
        highlightActiveItem(e.target);

        getJson(`${URL_USER_DATA}/${e.target.dataset.userId}`)
            .then(data => renderForm(data));
    }
}

function onNewUserBtnClick() {
    saveContactBtn.classList.remove('hidden');
    removeContactBtn.classList.add('hidden');

    renderForm(null);
    removeAttributes(mainForm.children, 'disabled');
    highlightActiveItem(null);
}

function onSaveBtnClick(e) {
    e.preventDefault();

    if (e.target == saveContactBtn) {
        let data = {
            name: mainInputs.name.value,
            company: mainInputs.company.value,
            website: mainInputs.website.value,
            phone: mainInputs.phone.value,
            email: mainInputs.email.value
        };

        postJson(URL_USER_DATA, data)
            .then(data => data.json())
            .then(data => addUser(data))

        mainForm.reset();
    }
}

function onRemoveBtnClick(e) {
    if (e.target.classList.contains(CLASS_REMOVE_BTN)) {
        deleteJson(`${URL_USER_DATA}/${e.target.dataset.userId}`, )
            .then(result => alert(`Removal request - Status: ${result.status}`));

        document.querySelector(`.${CLASS_ACTIVE}`).remove();
        mainForm.reset();
    }
}

function postJson(url, obj) {
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(obj)
    })
}

function getJson(url) {
    return fetch(url).then(resp => resp.json())
}

function deleteJson(url) {
    return fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json;charset=utf-8' }
    })
}

function addUser(data) {
    const newUser = TEMPLATE_SIDEBAR_USER
        .replace('{{id}}', data.id)
        .replace('{{name}}', data.name);

        sidebarList.innerHTML += newUser;
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
    Array.prototype.forEach.call(sidebarList.children,
        item => item.classList.remove(CLASS_ACTIVE));
    if (target) target.classList.add(CLASS_ACTIVE);
}