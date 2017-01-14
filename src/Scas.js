let Context = require('./context/Context');
let Workspace = require('./workspace/Workspace');

module.exports = class Scas {
    constructor(configLoader, workspaceService) {
        this.configLoader = configLoader;
        this.workspaceService = workspaceService;
    }

    handle(request) {
        return this.getContext(request)
            .then((context) => this.getWorkspace(context)
                .then((workspace) => this.workspaceService.handle(workspace, request)))
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
                // console.log(context);
            })
            .then(() => context)
    }

    getWorkspace(context) {
        return this.workspaceService.create(context);
    }
}
