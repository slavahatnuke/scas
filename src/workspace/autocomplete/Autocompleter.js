let _ = require('lodash');
let glob = require('glob');

module.exports = class Autocompleter {
    constructor(actionMatcher) {
        this.logger = Object.logger;
        this.actionMatcher = actionMatcher;
    }

    findAutocomplete(workspace, rawArguments) {
        let command = _.first(rawArguments);
        let commandStarts = new RegExp(`^${this.reEscape(command)}`, 'igm');

        return Promise.resolve()
            .then(() => {
                return workspace.actions.find((action) => {
                    if (command == action.name) {
                        action.active = true;
                    }

                    return !command || commandStarts.test(action.name);
                });
            })
            .then((actions) => {
                let words = [];

                if (actions.length > 1) {
                    return actions.map((action) => action.name);
                } else if (actions.length == 1) {
                    let action = actions[0];

                    if (action.active) {
                        return this.completeArguments(workspace, rawArguments, action);
                    } else {
                        words.push(action.name);
                    }

                    return words;
                } else {
                    return [];
                }
            });
    }

    completeArguments(workspace, rawArguments, action) {
        let args = rawArguments.slice(1);

        let lastWord = _.last(args);
        let currentArgument = action.arguments.find((arg) => arg.name == lastWord);

        if (args % 2) {
            // command
        } else {
            // value
            let prevWord = args.length >= 2 ? args[args.length - 2] : null;
            currentArgument = currentArgument || action.arguments.find((arg) => arg.name == prevWord);
        }

        let isLastWordArgument = currentArgument && currentArgument.name == lastWord;

        return Promise.resolve()
            .then(() => {
                if (!action.arguments.length) {
                    return [];
                }

                if (!args.length) {
                    return this.getActiveArguments(action);
                }

                return Promise.resolve()
                    .then(() => this.actionMatcher.fillArguments(args, action))
                    .then(() => {
                        if (args.length % 2) {
                            // argument
                            if (isLastWordArgument) {
                                return [];
                            } else {
                                return this.getActiveArguments(action);
                            }
                        } else {
                            // value
                            if (isLastWordArgument) {
                                return this.getActiveArguments(action);
                            } else {
                                return [];
                            }
                        }
                    })
            })
            .then((words) => {
                // this.logger.log('>>>', words);
                return words;
            })
            .then((words) => {
                if (words && words.length) {
                    return words;
                } else {
                    let cwd = workspace.context.cwd;
                    return Promise.resolve()
                        .then(() => {
                            // let last = lastWord;
                            let last = isLastWordArgument ? '' : lastWord;
                            let files = new Promise((resolve, reject) => {
                                glob(last + '*', {cwd: cwd}, (err, files) => err ? reject(err) : resolve(files))
                            });

                            let dirs = new Promise((resolve, reject) => {
                                if (last) {
                                    glob(last + '/*', {cwd: cwd}, (err, files) => err ? reject(err) : resolve(files))
                                } else {
                                    resolve([]);
                                }
                            });

                            return Promise.all([files, dirs, this.getActiveArguments(action)]).then(([files, dirs, actions]) => {
                                // this.logger.log('lastWord', last + '*')
                                return [].concat(actions, dirs, files);
                            });
                        });
                }
            })
            .then((words) => {
                // this.logger.log('>>>', words);
                return words;
            })
    }

    getActiveArguments(action) {
        return action.arguments.filter((arg) => !arg.active)
            .map((arg) => arg.name);
    }

    // fillActionArguments(args, action) {
    //     let currentArgumentName = null;
    //
    //     args.map((arg, idx) => {
    //         if (idx % 2) {
    //             // value case
    //             let actionArgument = action.arguments.find((actionArgument) => actionArgument.name == currentArgumentName);
    //
    //             if (actionArgument) {
    //                 actionArgument.value = arg;
    //                 actionArgument.active = true;
    //             }
    //         } else {
    //             //argument case
    //             currentArgumentName = arg;
    //             let actionArgument = action.arguments.find((actionArgument) => actionArgument.name == currentArgumentName);
    //             if (actionArgument) {
    //                 actionArgument.active = true;
    //             }
    //         }
    //     });
    // }

    reEscape(text) {
        return ('' + text).replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }

}
