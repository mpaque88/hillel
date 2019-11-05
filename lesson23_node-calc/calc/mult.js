function mult(...args) {
    return args.reduce((acc, val) => acc * val, 1)
}

module.exports = mult;