import $ from 'jquery';

import Collection from '../model/Collection';
import ListView from '../view/List';
import Form from '../view/Form';

export default class Controller {
    constructor() {
        this.collection = new Collection();
        this.listView = new ListView({
            onItemClick: this.onListItemClick.bind(this),
            onNewBtnClick: this.onNewBtnClick.bind(this)
        });
        this.form = new Form({
            onSaveBtnClick: this.onSaveBtnClick.bind(this),
            onRemoveBtnClick: this.onRemoveBtnClick.bind(this)
        });

        $('#sidebar-list').append(this.listView.$el);

        this.collection.fetchData()
            .then(() => this.listView.renderList(this.collection.list))
            .then(() => this.onNewBtnClick())
    }

    onListItemClick(id) {
        const model = this.collection.list.find(item => item.id == id);
        
        this.form.hideButtons();
        this.form.disableInputs();
        this.form.renderContact(model);
    }

    onNewBtnClick() {
        this.form.clearForm();
        this.form.toggleButtons();
        this.form.toggleInputs();
    }

    onSaveBtnClick(data) {
        this.collection.newItem(data);
        this.listView.renderList(this.collection.list);
    }

    onRemoveBtnClick(id) {
        if (id) {
            this.collection.removeItem(id);
            this.listView.renderList(this.collection.list);
        }
    }
}