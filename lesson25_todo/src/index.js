import $ from 'jquery';
import './style.scss';
import {LocalData} from './local.js';

$(function() {
    class Todo {
        static $TODO_TMPL = $('#todo-item-temp').html();
    
        constructor(el) {
            this.el = el;
            this.form = $('#todo-form');
            this.addBtn = $('#todo-add-btn');
            
            this.data = LocalData.getLocalData() || [];

            this.renderItems();
            this.bindEventListeners();
        }
    
        renderItems() {
            const items = this.getItemsHtml();
            this.appendItems(items);
        }

        getItemsHtml() {
            const itemsHtml = this.data.map(item => {
                return this.getItemHtml(item);
            })
    
            return itemsHtml;
        }
    
        getItemHtml({title, id, isDone}) {
            return Todo.$TODO_TMPL
                .replace('{{title}}', title)
                .replace('{{id}}', id)
                .replace('{{isDone}}', isDone ? 'todo-done' : '')
        }
    
        appendItems(items) {
            this.el.innerHTML = items.join('');
        }

        bindEventListeners() {
            $(this.el).on('click', this.onItemClick.bind(this));
            $(this.addBtn).on('click', this.onAddBtnClick.bind(this));
        }

        onItemClick(e) {
            const id = $(e.target).data('itemId');

            if ($(e.target).hasClass('delete-btn')) {
                this.removeTodoItem( $(e.target).parent().data('itemId') );
                LocalData.saveState(this.data);
            } 
            
            if ($(e.target).hasClass('todo-item')) {
                const item = this.findItemData(id);
                item.isDone = item.isDone ? false : true; 

                LocalData.saveState(this.data);
                this.renderItems();
            }
        }

        removeTodoItem(id) {
            this.data = this.data.filter(item => item.id != id);
            this.getTodoItem(id).remove();
        }

        getTodoItem(id) {
            return $(`[data-item-id="${id}"]`)
        }

        findItemData(id) {
            return this.data.find(item => item.id === id)
        }

        onAddBtnClick(e) {
            e.preventDefault();

            const input = this.form.children('input').val();
            this.addTodoItem(input);
            this.form[0].reset();
        }

        addTodoItem(title) {
            const item = this.createTodoItem(title);
            this.data.push(item);

            LocalData.saveState(this.data);
            this.renderItems();
        }

        createTodoItem(title) {
            return { title, id: Date.now(), isDone: false }
        }
    }

    const myTodo = new Todo($('#todo-list')[0]);
})