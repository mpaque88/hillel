import $ from 'jquery';

import Chat from './Chat.js';

import '../styles/style.scss';


const talk = new Chat({
    onMessage: data => addLog(data),
    name: 'Admin'
})

$('#root').append(`
<form id="form">
    <input type="text" name="message" id="message">
    <button type="submit" id="sendBtn">Send</button>
</form>
<div id="log"></div>
`)

const $log = $('#log');
const $input = $('#message');
const name = 'Admin';

$('#form').on('submit', sendMessage);

function addLog(message) {
    $log.append(`<div class="${message.type}">${message.name}:${message.message}</div>`)
}

function sendMessage(e) {
    e.preventDefault();
    talk.send(name, 'message', $input.val());
    $input.val('');
}


