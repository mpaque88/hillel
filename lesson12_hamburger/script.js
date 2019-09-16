'use strict'

function Hamburger(size, stuffing) {
    this.size = size;
    this.stuffing = stuffing;
    this.topping = [];
}

Hamburger.SIZE_SMALL = 'small';
Hamburger.SIZE_BIG = 'big';

Hamburger.STUFFING_CHEESE = 'cheese';
Hamburger.STUFFING_SALAD = 'salad';
Hamburger.STUFFING_POTATO = 'potato';

Hamburger.TOPPING_MAYO = 'mayo';
Hamburger.TOPPING_SPICE = 'spice';

Hamburger.CALORIES = {
    small: 20, big: 40,
    cheese: 20, salad: 5, potato: 10,
    mayo: 5, spice: 0
}

Hamburger.INGREDIENTS_PRICE = {
    small: 50, big: 100,
    cheese: 10, salad: 20, potato: 15,
    mayo: 20, spice: 15
}

Hamburger.prototype.addTopping = function (newTopping) {
    return this.topping.push(newTopping);
}

Hamburger.prototype.calculateCalories = function () {
    return this.calculate(Hamburger.CALORIES);
}

Hamburger.prototype.calculatePrice = function () {
    return this.calculate(Hamburger.INGREDIENTS_PRICE);
}

Hamburger.prototype.calculate = function (reference) {
    let array = this.getIngredients();

    array = this.replaceArrayWith(array, reference);

    return this.sumOf(array);
}

Hamburger.prototype.getIngredients = function () {
    let ingredients = [];

    ingredients.push(this.size, this.stuffing, this.topping);

    return ingredients.flat();
}

Hamburger.prototype.replaceArrayWith = function (array, source) {
    return array.map(x => x.replace(x, source[x]));
}

Hamburger.prototype.sumOf = function (array) {
    return array.reduce((acc, value) => acc + Number(value), 0);
}

const myBurger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);