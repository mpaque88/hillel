import $ from 'jquery';

export default class List {
    constructor(config) {
        this.config = config;
        this.$el = $('#sidebar-list');
        this.$newBtn = $('#newContactBtn');

        this.$el.on('click', '.sidebar-user', this.onContactClick.bind(this));
        this.$newBtn.on('click', this.onNewBtnClick.bind(this));
    }

    onContactClick(e) {
        const id = $(e.target).data('userId');
        this.highlightItem($(e.target))
        this.config.onItemClick(id);
    }

    renderList(data) {
        this.clearList();
        data.forEach(item => {
            this.renderListItem(item)
        });
    }

    renderListItem({id, name}) {
        this.$el.append(`<li class="sidebar-user" data-user-id="${id}">${name}</li>`)
    }

    clearList() {
        this.$el.html('');
    }

    onNewBtnClick() {
        this.highlightItem();
        this.config.onNewBtnClick()
    }

    highlightItem(item) {
        this.$el.children().removeClass('active');
        item && item.addClass('active');
    }

} 