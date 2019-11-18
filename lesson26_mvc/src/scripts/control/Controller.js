import $ from 'jquery';

import Collection from '../model/Collection';
import ListView from '../view/List';

export default class Controller {
    constructor() {
        this.collection = new Collection;
        this.listView = new ListView({
            onItemClick: this.onListItemClick.bind(this)
        });
        $(document.body).append(this.listView.$el);

        this.collection.fetchData()
            .then(() => this.listView.renderList(this.collection.list))
    }

    onListItemClick(id) {
        const model = this.collection.list.find(item => item.id == id);

        model.updateData({completed: !model.completed}) 
            .then(() => this.listView.renderList(this.collection.list))
    }
}