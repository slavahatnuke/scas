let Workspace = require('./Workspace');
let Hint = require('./help/Hint');
let _ = require('lodash');
let BatchResult = require('./action/handler/BatchResult');
let Action = require('./action/Action');
let async = require('async');

module.exports = class WorkspaceService {
    constructor(autoCompleteHandler, callHandler, helpService, importLoader) {
        this.autoCompleteHandler = autoCompleteHandler;
        this.callHandler = callHandler;
        this.helpService = helpService;
        this.importLoader = importLoader;
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
        let workspace = new Workspace();
        return Promise.resolve()
            .then(() => workspace.load(context))
            .then(() => this.importLoader.load(workspace))
            .then(() => workspace)
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
        } else if (result instanceof BatchResult) {
            return Promise.resolve()
                .then(() => result.getResults())
                .then((results) => {
                    return new Promise((resolve, reject) => {
                        async.eachSeries(results, (result, next) => {
                            this.render(result).then(() => next()).catch(next)
                        }, (err) => err ? reject(err) : resolve())
                    });
                });
        } else if (result instanceof Action) {
            let action = result;
            return this.callHandler.execute(action.workspace, action, null)
                .then((result) => this.render(result));
        } else {
        }
    }

    renderError(error) {
        console.error(error, error.stack);
    }

}
