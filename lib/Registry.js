module.exports = class Registry {
    constructor (data) {
        this.register = {};
        if (typeof(data) === 'object') {
            this.regsiter = data;
        }
    }

    registerItem(namespace, item) {
        this.register[namespace] = item;
    }
}