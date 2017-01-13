let Context = require('./context/Context');

module.exports = class Scas {
    constructor(configLoader) {
        this.configLoader = configLoader;
    }

    handle(request) {
        return this.getContext(request);
    }

    getContext(request) {
        let context = new Context();
        context.cwd = request.cwd;

        return Promise.resolve()
            .then(() => context.request = request)
            .then(() => this.configLoader.load(context))
            .then((config) => context.config = config)
            .then(() => {
                console.log(context);
            })
            .then(() => context)
    }
}
