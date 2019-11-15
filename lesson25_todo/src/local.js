export class LocalData {
    getLocalData() {
        return JSON.parse(localStorage.getItem('todoItems'))
    }

    saveState(data) {
        localStorage.setItem('todoItems', JSON.stringify(data));
    }
}