// export default class Customer { // ES6 Module syntax
class Customer {
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }
}

module.exports = Customer; // CommonJS (What Node.JS supports without poly)