let Config = require('./Config');

module.exports = class Loader {
    constructor(systemDir) {
        this.systemDir = systemDir;
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
            .catch(() => null)
            .then((path) => {
                return path || Promise.resolve()
                        .then(() => require(context.dir + '/' + context.configPath))
                        .then(() => context.dir + '/' + context.configPath);
            })
            .catch(() => null)
            .then((path) => {
                return path || Promise.resolve()
                        .then(() => require(this.systemDir + '/' + context.configPath))
                        .then(() => this.systemDir + '/' + context.configPath);
            })
            .catch(() => null)
    }
};
