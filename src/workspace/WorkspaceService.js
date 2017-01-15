let Workspace = require('./Workspace');
let Hint = require('./help/Hint');
let _ = require('lodash');

module.exports = class WorkspaceService {
    constructor(autoCompleteHandler, callHandler, helpService) {
        this.autoCompleteHandler = autoCompleteHandler;
        this.callHandler = callHandler;
        this.helpService = helpService;
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
            .then((handler) => handler.handle(workspace, request))
            .then((result) => this.render(result))
            .catch((error) => this.renderError(error));
    }

    create(context) {
        return Promise.resolve()
            .then(() => new Workspace().load(context))
    }

    getHandler(workspace, request) {
        return Promise.resolve()
            .then(() => {
                if (request.autocomplete) {
                    return this.autoCompleteHandler;
                } else {
                    return this.callHandler;
                }
            });
    }

    render(result) {
        if (result instanceof Hint) {
            return this.helpService.renderHint(result);
        } else {
            console.log('>> result', result);
        }
    }

    renderError(error) {
        console.error(error, error.stack);
    }

}
