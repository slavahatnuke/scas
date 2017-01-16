let _ = require('lodash');

module.exports = class Matcher {
    constructor(importLoader) {
        this.logger = Object.logger;
        this.importLoader = importLoader;
    }

    match(workspace, rawArguments) {
        return this.find(workspace, rawArguments);
    }

    find(workspace, rawArguments) {
        let command = _.first(rawArguments);
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
            .then((actions) => {
                return Promise.resolve()
                    .then(() => {
                        if (actions.length == 1 && actions[0].active && actions[0].nestedImport) {
                            let action = actions[0];

                            return Promise.resolve()
                                .then(() => {
                                    if (action.nestedImport) {
                                        return this.importLoader.load(action.workspace);
                                    }
                                })
                                .then(() => this.match(action.workspace, rawArguments.slice(1)))
                                .then((subActions) => {
                                    if (!subActions.length) {
                                        return actions;
                                    }

                                    if (subActions.length == 1) {
                                        return subActions;
                                    }

                                    return subActions;
                                });
                        } else {
                            return actions;
                        }
                    });
            })
            .then((actions) => {
                if (actions.length == 1 && actions[0].active) {
                    let action = actions[0];

                    return this.fillArguments(rawArguments.slice(1), action)
                        .then(() => actions);
                } else {
                    return actions;
                }
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

    fillArgumentsByObject(object, action) {
        return Promise.resolve()
            .then(() => {
                _.each(object, (value, name) => {
                    let actionArgument = action.arguments.find((actionArgument) => actionArgument.name == name);

                    if (actionArgument) {
                        actionArgument.value = value;
                        actionArgument.active = true;
                    }
                });
            });
    }

}
