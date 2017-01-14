let Workspace = require('./Workspace');

module.exports = class WorkspaceService {
    constructor(autoCompleteHandler, callHandler) {
        this.autoCompleteHandler = autoCompleteHandler;
        this.callHandler = callHandler;
    }

    handle(workspace, request) {
        return Promise.resolve()
            .then(() => {
                return request.hasOption('--compbash')
                    || request.hasOption('--compgen')
                    || request.hasOption('--completion-install')
                    || request.hasOption('--completion')
            })
            .then((isAutoComplete) => request.autocomplete = isAutoComplete)
            .then(() => this.getHandler(workspace, request))
            .then((handler) => handler.handle(workspace, request));
    }

    create(context) {
        let workspace = new Workspace();
        workspace.context = context;

        return Promise.resolve()
            .then(() => workspace.load(context));
    }

    getHandler(workspace, request) {
        return Promise.resolve()
            .then(() => {
                if(request.autocomplete) {
                    return this.autoCompleteHandler;
                } else {
                    return this.callHandler;
                }
            });
    }
}
