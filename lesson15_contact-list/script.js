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
        this.inputTphone = document.getElementById('inputTphone');
    }

    createHead() {
        const thead = document.createElement('thead');
        const row = document.createElement('tr');
        const nameCell = document.createElement('th');
        const surnameCell = document.createElement('th');
        const tphoneCell = document.createElement('th');
        const actionsCell = document.createElement('th');
        
        nameCell.innerText = 'Name';
        surnameCell.innerText = 'Surname';
        tphoneCell.innerText = 'T-phone';
        actionsCell.innerText = '-';
        
        row.append(nameCell, surnameCell, tphoneCell, actionsCell);
        thead.append(row);
    
        this.table.append(thead);
    }
    
    createBody() {
        const tbody = document.createElement('tbody');
        
        this.table.append(tbody);
    } 
    
    createFoot() {
        const tfoot = document.createElement('tfoot');
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const surnameCell = document.createElement('td');
        const tphoneCell = document.createElement('td');
        const addContactCell = document.createElement('td');
        
        addContactCell.setAttribute('id', 'addContact');
        addContactCell.innerText = 'Add';
        
        const nameInput = document.createElement('input');
        
        nameInput.setAttribute('type', 'text');
        nameInput.setAttribute('name', 'name');
        nameInput.setAttribute('id', 'inputName');
        nameInput.setAttribute('placeholder', 'Ivan');
        
        const surnameInput = document.createElement('input');
        
        surnameInput.setAttribute('type', 'text');
        surnameInput.setAttribute('name', 'surname');
        surnameInput.setAttribute('id', 'inputSurname');
        surnameInput.setAttribute('placeholder', 'Ivanov');
        
        const tphoneInput = document.createElement('input');
        
        tphoneInput.setAttribute('type', 'text');
        tphoneInput.setAttribute('name', 'tphone');
        tphoneInput.setAttribute('id', 'inputTphone');
        tphoneInput.setAttribute('placeholder', '+38(066)123-45-67');
        
        nameCell.append(nameInput);
        surnameCell.append(surnameInput);
        tphoneCell.append(tphoneInput);
        
        row.append(nameCell, surnameCell, tphoneCell, addContactCell);
        tfoot.append(row);

        this.table.append(tfoot);
    }
    
    bindAddEventListeners() {
        this.table.lastElementChild.firstElementChild.lastElementChild.addEventListener('click', this.addContact); // addCell

        this.table.children[1].addEventListener('click', this.removeContact); // tbody
    }

    addContact() {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const surnameCell = document.createElement('td');
        const tphoneCell = document.createElement('td');
        const removeCell = document.createElement('td');

        nameCell.innerText = this.inputName.value;
        surnameCell.innerText = this.inputSurname.value;
        tphoneCell.innerText = this.inputTphone.value;
        removeCell.innerText = 'x';

        row.append(nameCell, surnameCell, tphoneCell, removeCell);

        this.table.children[1].append(row); // tbody
    }

    removeContact(e) {
        if (!e.target.nextElementSibling) {
            e.target.parentNode.remove();
        }
    }
    
    // improvements:
    // - method for setting attr

}

const myContactList = new ContactList(
    document.getElementById('xx')
)