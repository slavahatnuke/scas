let Config = require('./Config');

module.exports = class Loader {
    constructor() {
    }

    load(context) {
        let path = context.configPath;
        let config = new Config();

        return this.resolve(context)
            .then((path) => config.path = path)
            .then(() => require(config.path))
            .catch(() => null)
            .then((data) => {
                return data || Promise.resolve()
                        .then(() => require('path').resolve(path))
                        .then((path) => config.path = path)
                        .then(() => require(config.path));
            })
            .catch(() => null)
            .then((data) => config.apply(data))
            .then(() => context.dir = config.dir)
            .then(() => config);
    }

    resolve(context) {
        return Promise.resolve()
            .then(() => require(context.configPath))
            .then(() => context.configPath)
            .catch(() => null);

    }
};
