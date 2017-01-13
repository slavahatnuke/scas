module.exports = class Pipes {
    constructor() {

    }

    load(context) {
        return Promise.resolve()
            .then(() => this);
    }
}
