$(function() {
    class Todo {
        static $TODO_TEMP = $('#todo-item-temp').html();
    
        constructor(el) {
            this.el = el;
            this.form = $('#todo-form');
            this.addBtn = $('#todo-add-btn');
            
            this.onItemClick = this.onItemClick.bind(this);
            this.onAddBtnClick = this.onAddBtnClick.bind(this);
            this.data = [];
    
            this.getLocalData();
            this.renderItems();

            $(this.el).on('click', this.onItemClick);
            $(this.addBtn).on('click', this.onAddBtnClick);
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
            return Todo.$TODO_TEMP
                .replace('{{title}}', title)
                .replace('{{id}}', id)
                .replace('{{isDone}}', isDone ? 'todo-done' : '')
        }
    
        appendItems(items) {
            this.el.innerHTML = items.join('');
        }

        onItemClick(e) {
            const $id = $(e.target).data('itemId');
            console.log($id)

            if ($(e.target).hasClass('delete-btn')) {
                this.removeTodoItem( $(e.target).parent().data('itemId') );
                this.saveState();
            } else {
                const item = this.findItemData($id);
                item.isDone = item.isDone ? false : true; 
    
                this.saveState();
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

        onAddBtnClick(e) {
            e.preventDefault();

            const input = this.form.children('input').val();
            this.addTodoItem(input);
        }

        addTodoItem(title) {
            const item = this.createTodoItem(title);
            
            this.data.push(item);

            this.saveState();
            this.renderItems();
        }

        createTodoItem(title) {
            return { title, id: Date.now(), isDone: false }
        }

        findItemData(id) {
            return this.data.find(item => item.id === id)
        }

        getLocalData() {
            if(localStorage.getItem('todoItems'))
            this.data = JSON.parse(localStorage.getItem('todoItems'))
        }

        saveState() {
            localStorage.setItem('todoItems', JSON.stringify(this.data));
        }
    }
    
    const myTodo = new Todo($('#todo-list')[0]);
})