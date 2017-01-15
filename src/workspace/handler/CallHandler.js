let Handler = require('./Handler');

module.exports = class CallHandler extends Handler {
    constructor(actionMatcher, helpService, actionHandlers) {
        super();
        this.actionMatcher = actionMatcher;
        this.helpService = helpService;
        this.actionHandlers = actionHandlers;
    }

    handle(workspace, request) {
        return this.actionMatcher.match(workspace, request)
            .then((actions) => {
                if (actions.length == 1) {
                    return this.execute(workspace, actions[0], request);
                } else if (actions.length) {
                    return this.helpService.actionsHelp(workspace, actions);
                } else {
                    return this.helpService.help(workspace);
                }
            });
    }

    execute(workspace, action, request) {
        return this.actionMatcher.fillArguments(request.arguments.slice(1), action)
            .then(() => action.isValid())
            .then((isValid) => {
                if (isValid) {
                    return this.getActionHandler(workspace, action, request)
                        .then((handler) => handler.handle(workspace, action, request));
                } else {
                    return this.helpService.actionHelp(workspace, action)
                }
            });
    }

    getActionHandler(workspace, action, request) {
        return Promise.resolve()
            .then(() => {
                return this.actionHandlers.find((handler) => handler.supports(workspace, action, request))
            })
    }
}
