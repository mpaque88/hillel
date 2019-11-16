import config from "../config";

export default class Model {
    constructor(data) {
        // console.log(data);
        Object.assign(this, data);
    }

    updateData(data) {
        Object.assign(this, data);

        return this.save();
    }

    save() {
        return this.id ? this.update() : 'task not found';
    }

    update() {
        console.log(this)
        return fetch(config.contactsUrl+`/${this.id}`, {
            method: 'PUT',
            data: JSON.stringify(this)
        });
    }
}