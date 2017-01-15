let _ = require('lodash');

module.exports = class Matcher {
    constructor() {
        this.logger = Object.logger;
    }

    match(workspace, request) {
        return this.find(workspace, request);
    }

    find(workspace, request) {
        return this.findArguments(workspace, request.rawArguments);
    }


    fillArguments(args, action) {
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
    }

    findArguments(workspace, rawArguments) {
        let input = rawArguments.join(' ');

        return workspace.actions.find((action) => {
            return action.name === input;
        });
    }
}
