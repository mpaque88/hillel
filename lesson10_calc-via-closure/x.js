const calculator = createCalculator(10);

function createCalculator(x = 0) {
    function value() { return x }

    value.add = (y) => x += y;
    value.sub = (y) => x -= y;
    value.mult = (y) => x *= y;
    value.divide = (y) => x /= y;
    value.set = (y) => x = y;

    return value;
}