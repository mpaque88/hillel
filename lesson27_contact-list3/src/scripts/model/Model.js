import config from "../config";

export default class Model {
    constructor(data) {
        Object.assign(this, data);
    }

    setData(data) {
        Object.assign(this, data)
    }

    postReq() {
        return fetch(config.contactsUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this)
        })
        .then(resp => resp.json())
        .then(data => this.setData(data))
        .catch(err => console.warn(err))
    }

    deleteReq() {
        return fetch(config.contactsUrl + `/${this.id}`, {method: 'DELETE'})
            .catch(err => console.warn(err))
    }
}