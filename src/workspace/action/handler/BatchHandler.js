let Handler = require('./Handler');
let Hint = require('../../help/Hint');
let Request = require('../../../cli/Request');
let spawnArgs = require('spawn-args');
let BatchResult = require('./BatchResult');
let _ = require('lodash');

module.exports = class BatchHandler extends Handler {
    constructor(helpService, actionMatcher, templateService) {
        super();
        this.helpService = helpService;
        this.actionMatcher = actionMatcher;
        this.templateService = templateService;
    }

    handle(workspace, batchAction, request) {
        return Promise.resolve()
            .then(() => {
                return Promise.all(batchAction.batch.map((line) => this.handleAction(batchAction.workspace, line, batchAction)))
            })
            .then((actions) => new BatchResult(actions));
    }

    handleAction(workspace, line, batchAction) {
        let request = new Request();
        request.rawArguments = spawnArgs(line.name);
        request.arguments = request.rawArguments;

        return this.actionMatcher.match(workspace, request.rawArguments)
            .then((actions) => {
                if (actions.length == 1) {
                    return this.prepareAction(workspace, batchAction, line, actions[0]);
                } else if (actions.length) {
                    return this.helpService.actionsHelp(workspace, actions);
                } else {
                    return this.helpService.help(workspace);
                }
            });
    }

    supports(workspace, action) {
        return action.batch;
    }

    prepareAction(workspace, batchAction, line, action) {
        // return this.prepareAction(workspace, batchAction, line, actions[0])
        return Promise.resolve()
            .then(() => {
                let hash = batchAction.getParameters();

                let renderContext = batchAction.getParameters({
                    $$context: workspace.context,
                    $$workspace: action.workspace
                });

                return Promise
                    .all(_.keys(line.map || {}).map((name) => {
                        let valueTemplate = ('' + line.map[name]).trim();

                        return Promise.resolve()
                            .then(() => this.templateService.getTemplate(workspace, valueTemplate))
                            .then((template) => template.render(renderContext))
                            .then((value) => hash[name] = value);
                    }))
                    .then(() => hash);
            })
            .then((object) => this.actionMatcher.fillArgumentsByObject(object, action))
            .then(() => action);
    }
}

module.exports.$tags = ['action', 'handler'];