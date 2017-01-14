let Handler = require('./Handler');

module.exports = class CallHandler extends Handler {
    constructor(actionMatcher, helpService) {
        super();
        this.actionMatcher = actionMatcher;
        this.helpService = helpService;
    }

    handle(workspace, request) {
        return this.actionMatcher.match(workspace, request)
            .then((actions) => {
                if (actions.length == 1) {
                    return this.execute(workspace, actions[0]);
                } else if (actions.length) {
                    return this.helpService.actionsHelp(workspace);
                } else {
                    return this.helpService.help(workspace);
                }
            });
    }

    execute(workspace, action) {

    }
}
