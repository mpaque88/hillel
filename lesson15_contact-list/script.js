class ContactList {
    static TABLE_MAIN_CLASS = 'contact-list-table'; 
    
    constructor(table){
        this.table = table;
        this.table.classList.add(ContactList.TABLE_MAIN_CLASS);
        
        this.addContact = this.addContact.bind(this);
        this.removeContact = this.removeContact.bind(this);

        this.createHead();
        this.createBody();
        this.createFoot();
        this.bindAddEventListeners();
        
        this.inputName = document.getElementById('inputName');
        this.inputSurname = document.getElementById('inputSurname');
        this.inputPhone = document.getElementById('inputPhone');
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
    
    setTableRowValues(row, name, surname, phone, action) {
        row.children[0].innerText = name;
        row.children[1].innerText = surname;
        row.children[2].innerText = phone;
        row.children[3].innerText = action;
        return row;
    }
    
    setAttributes(elem, obj) {
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                elem[prop] = obj[prop];
            }
        }
    }

    // methods

    createHead() {
        const thead = document.createElement('thead');
        const newRow = this.createTableRow('th');

        this.setTableRowValues(newRow, 'Name', 'Surname', 'Phone', 'Action');

        thead.append(newRow);
        this.table.append(thead);
    }

    createBody() {
        const tbody = document.createElement('tbody');
        
        this.table.append(tbody);
    } 
    
    createFoot() {
        const tfoot = document.createElement('tfoot');
        const newRow = this.createTableRow('td');
        const nameInput = document.createElement('input');
        const surnameInput = document.createElement('input');
        const tphoneInput = document.createElement('input');
        
        this.setAttributes(nameInput, 
            { type: 'text', name: 'name', id: 'inputName', placeholder: 'Ivan' });
        
        this.setAttributes(surnameInput, 
            { type: 'text', name: 'surname', id: 'inputSurname', placeholder: 'Ivanov' });
            
        this.setAttributes(tphoneInput, 
        { type: 'text', name: 'phone', id: 'inputPhone', placeholder: '+38(066)123-45-67' });

        newRow.children[0].append(nameInput);
        newRow.children[1].append(surnameInput);
        newRow.children[2].append(tphoneInput);
        newRow.children[3].innerText = 'Add';
        
        tfoot.append(newRow);
        this.table.append(tfoot);
    }
    
    bindAddEventListeners() {
        this.table.lastElementChild.firstElementChild.lastElementChild
        .addEventListener('click', this.addContact); // addCell

        this.table.children[1]
        .addEventListener('click', this.removeContact); // tbody
    }

    addContact() {
        const newRow = this.createTableRow('td');
        this.setTableRowValues(newRow, this.inputName.value, 
                                       this.inputSurname.value, 
                                       this.inputPhone.value, 
                                       'Remove');

        this.table.children[1].append(newRow); // tbody
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