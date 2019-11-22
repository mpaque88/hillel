import config from '../config';
import Model from './Model';

export default class Collection {
    constructor() {
        this.list = [];
    }

    fetchData() {
        return fetch(config.contactsUrl)
                .then(resp => resp.json())
                .then(data => this.setData(data))
    }

    setData(data) {
        this.list = data.map(item => new Model(item));
    }

    newItem(data) {
        const item = new Model(data);
        item.postReq();

        return this.list.push(item);
    }

    removeItem(id) {
        const item = this.getModelById(id);
        item.deleteReq(id);

        this.list = this.list.filter(item => {
            return item.id != id;
        })
    }

    getModelById(id) {
        return this.list.find(item => item.id == id)
    }

}