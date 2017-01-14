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

    findArguments(workspace, rawArguments) {
        let input = rawArguments.join(' ');

        return workspace.actions.find((action) => {
            return action.name === input;
        });
    }
}
