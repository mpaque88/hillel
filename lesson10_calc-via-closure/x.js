const calculator = createCalculator(10);

function createCalculator(x = 0) {
    return {
        add : (y) => x += y,
        sub : (y) => x -= y,
        mult : (y) => x *= y,
        div : (y) => x /= y,
        set : (y) => x = y
    }
}