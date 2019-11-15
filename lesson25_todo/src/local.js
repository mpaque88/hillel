export class LocalData {
    static getLocalData() {
        return JSON.parse(localStorage.getItem('todoItems'))
    }

    static saveState(data) {
        localStorage.setItem('todoItems', JSON.stringify(data));
    }
}