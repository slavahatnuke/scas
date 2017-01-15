let _ = require('lodash');

module.exports = class Matcher {
    constructor() {
        this.logger = Object.logger;
    }

    match(workspace, request) {
        return this.find(workspace, request);
    }

    find(workspace, request) {
        let command = _.first(request.rawArguments);
        let commandStarts = new RegExp(`^${_.escapeRegExp('' + command)}$`, 'igm');

        return Promise.resolve()
            .then(() => {
                return workspace.actions.find((action) => {
                    if (command == action.name) {
                        action.active = true;
                        return true;
                    }

                    return commandStarts.test(action.name);
                });
            })
    }

    fillArguments(args, action) {
        return Promise.resolve()
            .then(() => {
                let currentArgumentName = null;

                args.map((arg, idx) => {
                    if (idx % 2) {
                        // value case
                        let actionArgument = action.arguments.find((actionArgument) => actionArgument.name == currentArgumentName);

                        if (actionArgument) {
                            actionArgument.value = arg;
                            actionArgument.active = true;
                        }
                    } else {
                        //argument case
                        currentArgumentName = arg;
                        let actionArgument = action.arguments.find((actionArgument) => actionArgument.name == currentArgumentName);
                        if (actionArgument) {
                            actionArgument.active = true;
                        }
                    }
                });
            });
    }
}
