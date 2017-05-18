let Config = require('./Config');

module.exports = class Loader {
    constructor(systemDir) {
        this.systemDir = systemDir;
    }

    load(context) {
        let configPath = context.configPath;
        let config = new Config();

        return this.resolve(context, configPath)
            .then((path) => {
                config.path = path;
                // console.log({path});
            })
            .then(() => require(config.path))
            .catch(() => null)
            .then((data) => data && config.apply(data))
            .then(() => context.dir = config.dir)
            .then(() => config);
    }

    resolve(context, configPath) {
        let $path = null;

        return Promise.resolve($path)
        // context dir config
            .then((path) => {
                return path || Promise.resolve()
                        .then(() => $path = context.dir + '/' + configPath)
                        .then(() => require.resolve($path))
                        .catch(() => null);
            })

            // npm package or local config
            .then((path) => {
                return path || Promise.resolve()
                        .then(() => $path = configPath)
                        .then(() => require.resolve($path))
                        .catch(() => null);
            })

            // npm package from node_modules
            .then((path) => {
                return path || Promise.resolve()
                        .then(() => $path = require('fs').resolve(configPath + '/node_modules'))
                        .then(() => require.resolve($path))
                        .catch(() => null);
            })

            // local file
            .then((path) => {
                return path || Promise.resolve()
                        .then(() => $path = require('path').resolve(configPath))
                        .then(() => require($path))
                        .then(() => $path)
                        .catch(() => null);
            })

            // recursive load to root
            .then((path) => {
                return path || Promise.resolve()
                        .then(() => $path = this.findRecursivelyToParent(configPath))
                        .then(() => require($path))
                        .then(() => $path)
                        .catch(() => null);
            })

            // system (scas dir)
            .then((path) => {
                return path || Promise.resolve()
                        .then(() => $path = this.systemDir + '/' + configPath)
                        .then(() => require.resolve($path))
                        .catch(() => null);
            })

            // final
            .then((path) => context.configPath = path)
            .catch(() => context.configPath = null)
            .then(() => context.configPath)
    }

    findRecursivelyToParent(configPath) {
        try {
            let absolutePath = require.resolve(configPath);
            require(absolutePath);
//            console.log('>> found', absolutePath);
            return absolutePath;
        } catch (e) {
            let path = require('path');
            let absolutePath = path.resolve(configPath);
            let dir = path.dirname(absolutePath);
            let parentDir = path.dirname(dir);

            let name = path.basename(absolutePath);

            return this.findRecursivelyToParent(parentDir + '/' + name);
        }
    }
};
