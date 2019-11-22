import $ from 'jquery';
// import 'jquery-validation';

export default class Form{
    constructor(config){
        this.config = config;

        this.$form = $('.main-form');
        this.$nameInput = this.$form.find('#name');
        this.$surnameInput = this.$form.find('#surname');
        this.$emailInput = this.$form.find('#email');
        this.$idInput = this.$form.find('#id');
        this.$rmBtn = $('.remove-button');

        this.$form.on('submit', this.onSaveBtnClick.bind(this));
        this.$rmBtn.on('click', this.onRemoveBtnClick.bind(this));
        
        // this.$form.validate({
        //     rules: {
        //         name: {required: true},
        //         surname: {required: true},
        //         email: {required: true, email: true}
        //     }
        // });
    }

    renderContact({name, surname, email, id}) {
        this.$nameInput.val(name);
        this.$surnameInput.val(surname);
        this.$emailInput.val(email);
        this.$idInput.val(id);
    } 

    onSaveBtnClick(e){
        e.preventDefault();

        const data = this.getInputValues();
        const obj = {};

        data.forEach(item => obj[item.name] = item.value);
        obj.id = Date.now();

        this.toggleInputs();
        this.toggleButtons();
        this.clearForm();

        this.config.onSaveBtnClick(obj);
    }

    onRemoveBtnClick() {
        const id = this.$idInput.val();

        this.clearForm();
        this.$idInput.val('');

        this.config.onRemoveBtnClick(id);
    }

    getInputValues() {
        return this.$form.serializeArray();
    }

    toggleInputs() {
        $('.form-input').prop('disabled', !$('.form-input').prop('disabled'))
    }

    toggleButtons() {
        this.$form.children('button').toggleClass('hidden')
    }

    disableInputs() {
        $('.form-input').prop('disabled', true)
    }

    hideButtons() {
        this.$form.children('button').addClass('hidden')
    }

    clearForm() {
        this.$form[0].reset()
    }
}