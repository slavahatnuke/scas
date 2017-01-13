module.exports = class Imports {
    constructor() {

    }

    load(context) {
        return Promise.resolve()
            .then(() => this);
    }
}
