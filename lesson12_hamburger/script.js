'use strict'

function Hamburger(size, stuffing) {
    this.size = size;
    this.stuffing = stuffing;

}

Hamburger.SIZE_SMALL = 'small';
Hamburger.SIZE_BIG = 'big';

Hamburger.STUFFING_CHEESE = 'cheese';
Hamburger.STUFFING_SALAD = 'salad';
Hamburger.STUFFING_POTATO = 'potato';

Hamburger.TOPPING_MAYO = 'mayo';
Hamburger.TOPPING_SPICE = 'spice';

Hamburger.CALORIES = {
    small: 20,
    big: 40,

    cheese: 20,
    salad: 5,
    potato: 10,

    mayo: 5,
    spice: 0
}

Hamburger.INGREDIENTS_PRICE = {
    small: 50,
    big: 100,

    cheese: 10,
    salad: 20,
    potato: 15,

    mayo: 20,
    spice: 15
}

Hamburger.prototype.addTopping = function (newTopping) {

    if (!this.topping) this.topping = new Array;
    this.topping.push(newTopping);
}

Hamburger.prototype.calculateCalories = function () {
    let array = this.getIngredients();

    array = array.map(x => x.replace(x, Hamburger.CALORIES[x]));

    return array.reduce((acc, value) => acc + +value, 0);
}

Hamburger.prototype.calculatePrice = function () {
    let array = this.getIngredients();
    
    array = array.map(x => x.replace(x, Hamburger.INGREDIENTS_PRICE[x]));

    return array.reduce((acc, value) => acc + +value, 0);
}

Hamburger.prototype.getIngredients = function () {
    let ingredients = [];

    for (let key in this) {
        if (this.hasOwnProperty(key)) {
            let x = this[key];
            ingredients.push(x);
        }
    }

    return ingredients.flat();
}


const myBurger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);