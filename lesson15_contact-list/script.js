class ContactList {
    static CONTAINER_MAIN_CLASS = 'contact-list-container';
    static CONTAINER_FORM_CLASS = 'contact-list-form-container';
    static TABLE_MAIN_CLASS = 'contact-list-table'; 
    static FORM_MAIN_CLASS = 'contact-list-form';
    
    constructor(table){
        this.table = table;
        this.table.classList.add(ContactList.TABLE_MAIN_CLASS);
        this.addContact = this.addContact.bind(this);
        this.removeContact = this.removeContact.bind(this);

        this.createHead();
        this.createBody();
        this.encapsulateTable();
        this.createForm();
        this.encapsulateForm();
        this.bindAddEventListeners();
        
        this.inputName = this.table.nextElementSibling.firstElementChild.children[0];
        this.inputSurname = this.table.nextElementSibling.firstElementChild.children[1];
        this.inputPhone = this.table.nextElementSibling.firstElementChild.children[2];
    }

    // tools

    createTableRow(cellType) {
        const row = document.createElement('tr');
        const nameCell = document.createElement(cellType);
        const surnameCell = document.createElement(cellType);
        const tphoneCell = document.createElement(cellType);
        const actionCell = document.createElement(cellType);
        row.append(nameCell, surnameCell, tphoneCell, actionCell);
        return row;
    }
    
    setTableRowValues(row, ...values) {
        row.children[0].innerText = values[0]; // name
        row.children[1].innerText = values[1]; // surname
        row.children[2].innerText = values[2]; // phone
        row.children[3].innerText = values[3]; // action
        return row;
    }
    
    setAttributes(elem, obj) {
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                elem[prop] = obj[prop];
            }
        }
    }

    stringValidation(string) {

        if (string) { 
            string = string.trim().split('') 
        } else {
            return false
        }

        let arr = string.map(Number);

        for (let i = 0; i < arr.length; i++) {
            if (!!arr[i]) {
                return false;
            }
        }

        return string.join('');
    }

    phoneValidation(value) {
        let template = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        console.log(value);
        
        if (value.match(template)) {
            return true
        } else {
            return false
        }
    }

    // methods

    createHead() {
        const thead = document.createElement('thead');
        const newRow = this.createTableRow('th');

        this.setTableRowValues(newRow, 'Name', 'Surname', 'Phone', '-');

        thead.append(newRow);
        this.table.append(thead);
    }

    createBody() {
        const tbody = document.createElement('tbody');
        
        this.table.append(tbody);
    } 
    
    encapsulateTable() {
        const container = document.createElement('div');
        container.classList.add(ContactList.CONTAINER_MAIN_CLASS);

        this.table.before(container);
        container.append(this.table);
    }

    encapsulateForm() {
        const container = document.createElement('div');
        container.classList.add(ContactList.CONTAINER_FORM_CLASS);

        this.table.after(container);
        container.append(container.nextElementSibling);
    }
    
    createForm() {
        const form = document.createElement('form');
        const nameInput = document.createElement('input');
        const surnameInput = document.createElement('input');
        const phoneInput = document.createElement('input');
        const addBtn = document.createElement('button');

        this.setAttributes(nameInput, 
            { type: 'text', name: 'name', id: 'inputName', placeholder: 'Ivan' });
            
        this.setAttributes(surnameInput, 
            { type: 'text', name: 'surname', id: 'inputSurname', placeholder: 'Ivanov' });
            
        this.setAttributes(phoneInput, 
            { type: 'text', name: 'phone', id: 'inputPhone', placeholder: '066-756-4321' });

        this.setAttributes(addBtn, 
            { type: 'submit', name: 'add', id: 'addBtn' });

        addBtn.innerText = 'Add';

        form.classList.add(ContactList.FORM_MAIN_CLASS);
        form.setAttribute('action', '#');

        form.append(nameInput, surnameInput, phoneInput, addBtn);
        this.table.after(form);
    }

    bindAddEventListeners() {
        this.table.nextElementSibling.firstElementChild.lastElementChild
        .addEventListener('click', this.addContact);
    
        this.table.children[1]
        .addEventListener('click', this.removeContact); // tbody
    }

    addContact(e) {
        e.preventDefault();

        let isNameValid = this.stringValidation(this.inputName.value);
        let isSurnameValid = this.stringValidation(this.inputSurname.value);
        let isPhoneValid = this.phoneValidation(this.inputPhone.value);

        if (!isNameValid) { 
            this.inputName.classList.add('red-warning') 
        } else {
            this.inputName.classList.remove('red-warning')             
        }
        if (!isSurnameValid) { 
            this.inputSurname.classList.add('red-warning') 
        } else {
            this.inputSurname.classList.remove('red-warning')             
        }
        if (!isPhoneValid) { 
            this.inputPhone.classList.add('red-warning') 
        } else {
            this.inputPhone.classList.remove('red-warning')             
        }
        
        if (isNameValid && isSurnameValid && isPhoneValid) {
            this.inputName.classList.remove('red-warning');
            this.inputSurname.classList.remove('red-warning');
            this.inputPhone.classList.remove('red-warning');

            const newRow = this.createTableRow('td');
            this.setTableRowValues(newRow, this.inputName.value, 
                                           this.inputSurname.value, 
                                           this.inputPhone.value, 
                                           'X');
    
            this.table.children[1].append(newRow); // tbody

            this.inputName.value = '';
            this.inputSurname.value = '';
            this.inputPhone.value = '';
        }

    }

    removeContact(e) {
        if (!e.target.nextElementSibling) {
            e.target.parentNode.remove();
        }
    }

}

const myContactList = new ContactList(
    document.getElementById('xx')
)