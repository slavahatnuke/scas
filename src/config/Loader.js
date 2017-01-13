let Config = require('./Config');

module.exports = class Loader {
    constructor() {
    }

    load(context) {
        return this.resolve(context)
            .then((path) => require(context.configPath))
            .catch(() => null)
            .then((data) => {
                return data || Promise.resolve()
                        .then(() => require('path').resolve(context.configPath))
                        .then((path) => path && require(path));
            })
            .catch(() => null)
            .then((data) => new Config(data || {}));
    }

    resolve(context) {
        return Promise.resolve()
            .then(() => require(context.configPath))
            .then(() => context.configPath)
            .catch(() => null);

    }
};
