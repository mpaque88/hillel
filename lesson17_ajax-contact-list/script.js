const CLASS_SIDEBAR_CONTAINER = 'sidebar';
const CLASS_SIDEBAR_LIST = 'sidebar-list';
const CLASS_SIDEBAR_USER = 'sidebar-user';

const SIDEBAR_USER_TEMPLATE = document.getElementById('sidebarUser').innerHTML.trim();
const FULL_CONTACT_TEMPLATE = document.getElementById('fullUserName').innerHTML.trim();

const SIDEBAR_CONTAINER = document.getElementById('sidebar');
const SIDEBAR_LIST = SIDEBAR_CONTAINER.firstElementChild;
const MAIN_CONTAINER = document.getElementById('main');

const USER_DATA_URL = 'https://jsonplaceholder.typicode.com/users';
const USER_DATA_URL_TEMPLATE = 'https://jsonplaceholder.typicode.com/users/{{id}}';

let users = [];

fetch(USER_DATA_URL)
    .then(resp => resp.json())
    .then(data => {
        createSidebar(data, SIDEBAR_LIST);
        bindEventListeners();
        renderUserInfo(data[0]);
    });

function createSidebar(json, elem) {
    createUserList(json, elem);
    adjustClasses(elem.children, CLASS_SIDEBAR_USER);

    elem.classList.add(CLASS_SIDEBAR_LIST);
    elem.parentElement.classList.add(CLASS_SIDEBAR_CONTAINER);
}

function createUserList(json, elem) {
    let listData = json.map(item => {
        return SIDEBAR_USER_TEMPLATE.replace('{{id}}', item.id)
            .replace('{{name}}', item.name);
    })

    elem.innerHTML = listData.join(`\n`);
}

function adjustClasses(collection, addClass) {
    Array.prototype.forEach.call(collection, item => item.classList.add(addClass))
}

function bindEventListeners() {
    SIDEBAR_CONTAINER.addEventListener('click', onUserClick);
}

function onUserClick(e) {
    MAIN_CONTAINER.classList.add('loading');

    if (e.target.classList.contains(CLASS_SIDEBAR_USER)) {
        fetch(USER_DATA_URL_TEMPLATE.replace('{{id}}', e.target.dataset.userId))
            .then(resp => resp.json())
            .then(data => {
                renderUserInfo(data);

                MAIN_CONTAINER.classList.add('visible');
                MAIN_CONTAINER.classList.remove('loading');
            })
    }
}

function renderUserInfo(data) {
    MAIN_CONTAINER.innerHTML = FULL_CONTACT_TEMPLATE
        .replace('{{city}}', data.address.city)
        .replace('{{street}}', data.address.street)
        .replace('{{suite}}', data.address.suite)
        .replace('{{zipcode}}', data.address.zipcode)
        .replace('{{lat}}', data.address.geo.lat)
        .replace('{{lng}}', data.address.geo.lng)
        .replace('{{companyname}}', data.company.name)
        .replace('{{catchphrase}}', data.company.catchPhrase)
        .replace('{{bs}}', data.company.bs)
        .replace('{{email}}', data.email)
        .replace('{{phone}}', data.phone)
        .replace('{{username}}', data.username)
        .replace('{{website}}', data.website)
        .replace('{{name}}', data.name);
}