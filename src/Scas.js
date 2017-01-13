let Context = require('./context/Context');
let Workspace = require('./workspace/Workspace');

module.exports = class Scas {
    constructor(configLoader) {
        this.configLoader = configLoader;
    }

    handle(request) {
        return this.getContext(request)
            .then((context) => this.getWorkspace(context)
                .then((workspace) => workspace.handle(request)))
    }

    getContext(request) {
        let context = new Context();
        context.cwd = request.cwd;
        context.container = require('../container');

        return Promise.resolve()
            .then(() => context.request = request)
            .then(() => this.configLoader.load(context))
            .then((config) => context.config = config)
            .then(() => {
                console.log(context);
            })
            .then(() => context)
    }

    getWorkspace(context) {
        let workspace = new Workspace();
        workspace.context = context;

        return Promise.resolve()
            .then(() => workspace.load(context));
    }
}
