import $ from 'jquery';

export default class List {
    constructor(config) {
        this.config = config;
        this.$el = this.createElement();
        this.$el.on('click', '.todo-item', this.onTodoItemClick.bind(this));
    }

    onTodoItemClick(e) {
        const id = $(e.target).data('id');
        this.config.onItemClick(id);
    }

    createElement() {
        return $('<ul></ul>')
    }

    renderList(data) {
        this.clearList();
        data.forEach(item => this.renderListItem(item));
    }

    renderListItem({title, completed, id}) {
        this.$el.append(`<li class="todo-item ${completed ? 'task-done' : ''}" data-id="${id}">${title}</li>`)
    }

    clearList() {
        this.$el.html('');
    }
} 