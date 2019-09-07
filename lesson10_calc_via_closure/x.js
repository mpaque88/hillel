const calculator = createCalculator(10);

function createCalculator(x = 0) {

    function value() { return x }

    value.add = (y) => x += y;
    value.sub = (y) => x -= y;
    value.mult = (y) => x *= y;
    value.div = (y) => x /= y;
    value.set = (y) => x = y;

    return value;
    
}

console.log(calculator());          //10
console.log(calculator.add(5));     //15
console.log(calculator.sub(5));     //10
console.log(calculator.mult(4));    //40
console.log(calculator.div(4));     //10
console.log(calculator.set(999));   //999
