let _ = require('lodash');
let glob = require('glob');
let fs = require('fs');

module.exports = class Autocompleter {
    constructor(actionMatcher, importLoader) {
        this.logger = Object.logger;
        this.actionMatcher = actionMatcher;
        this.importLoader = importLoader;
    }

    findAutocomplete(workspace, rawArguments) {
        let command = _.first(rawArguments);
        let commandStarts = new RegExp(`^${_.escapeRegExp('' + command)}`, 'igm');

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
                        if (action.nestedImport) {
                            return Promise.resolve()
                                .then(() => this.importLoader.load(action.workspace))
                                .then(() => this.findAutocomplete(action.workspace, rawArguments.slice(1)));
                        } else {
                            return this.completeArguments(action.workspace, rawArguments, action);
                        }
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
        return Promise.resolve()
            .then(() => {
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
                            return this.getNoneActiveArguments(action);
                        }

                        return Promise.resolve()
                            .then(() => this.actionMatcher.fillArguments(args, action))
                            .then(() => {
                                if (args.length % 2) {
                                    // argument
                                    if (isLastWordArgument) {
                                        return [];
                                    } else {
                                        return this.getNoneActiveArguments(action);
                                    }
                                } else {
                                    // value
                                    if (isLastWordArgument) {
                                        return this.getNoneActiveArguments(action);
                                    } else {
                                        return [];
                                    }
                                }
                            })
                    })
                    .then((words) => {
                        // this.log('>>>', words);
                        return words;
                    })
                    .then((words) => {
                        if (words && words.length) {
                            return words;
                        } else {
                            return Promise.resolve()
                                .then(() => {
                                    let path = isLastWordArgument ? '' : lastWord;
                                    return this.readDir(path)
                                        .then((theWords) => {
                                            words = [].concat(theWords, this.getNoneActiveArguments(action))
                                        });
                                })
                                .then(() => words);
                        }
                    })
                    .then((words) => {
                        // this.log('>>>', words);
                        return words;
                    })
            });
    }

    readDir(path) {
        let files = new Promise((resolve, reject) => {
            glob(path + '*', {dot: true}, (err, files) => err ? reject(err) : resolve(files))
        });

        return files.then((files) => {
            let words = [].concat(files);

            return Promise.resolve()
                .then(() => {
                    let re = new RegExp(`^${path}`, 'igm');
                    let matchedFolders = words.filter((word) => re.test(word));

                    if (matchedFolders.length == 1) {
                        let folder = matchedFolders[0];

                        return Promise.resolve()
                            .then(() => {
                                return new Promise((resolve, reject) => {
                                    fs.lstat(folder, (err, stat) => err ? reject(err) : resolve(stat.isDirectory()))
                                })
                                    .catch(() => false)
                            })
                            .then((isDir) => {
                                if (isDir) {
                                    return this.readDir(folder + '/')
                                        .then((theWords) => {
                                            words = theWords;
                                        });
                                }
                            })
                    }
                })
                .then(() => words);
        });
    }

    getNoneActiveArguments(action) {
        return action.arguments.filter((arg) => !arg.active)
            .map((arg) => arg.name);
    }

    log(message) {
        this.logger.log.apply(this.logger, arguments)
    }

}
