const SHORT_CONTACT_TEMP = document.getElementById('shortContactTemplate').innerHTML.trim();
const FULL_CONTACT_TEMP = document.getElementById('fullContactTemplate').innerHTML.trim();
const SHORT_USER_LIST_DIV = document.getElementById('list-short');
const SHORT_USER_LIST_UL = SHORT_USER_LIST_DIV.firstElementChild;
const USERS_DATA = 'https://jsonplaceholder.typicode.com/users';
const USER_DATA_TEMPLATE = 'https://jsonplaceholder.typicode.com/users/{{id}}';

let users = [];

fetch(USERS_DATA)
    .then(resp => resp.json())
    .then(data => createUserList(data, SHORT_USER_LIST_UL));

function createUsers(json, elem) {
    createUserList(json, elem);
    // TO DO
    //renderUserInfo();
}

function createUserList(json, elem) {
    let listData = json.map(item => {
        return SHORT_CONTACT_TEMP.replace('{{id}}', item.id)
                                 .replace('{{name}}', item.name);
    })

    elem.innerHTML = listData.join(`\n`);
}











// async data fetch

// createTimer(3000).then(() => {
//     console.log('alert');  
//     return fetch(url);
// })
// .then((resp) => {
//     return resp.json();
// })
// .then((data) => {
//     console.log(data);
// })
// .catch(() => {
//     console.log('error');
// })

// function createTimer(miliseconds) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             (miliseconds >= 5000) ? reject() : resolve();
//         }, miliseconds);
//     })
// }


