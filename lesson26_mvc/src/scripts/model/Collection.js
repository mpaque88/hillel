import config from '../config';
import Model from './Model';


export default class Collection {
    constructor() {
        this.list = [];
    }

    fetchData() {
        return fetch(`${config.contactsUrl}/?_limit=5`)
                .then(resp => resp.json())
                .then(data => this.setData(data))
    }

    setData(data) {
        this.list = data.map(item => new Model(item));
    }
}