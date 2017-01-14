let _ = require('lodash');

module.exports = class Autocompleter {
    constructor() {
        this.logger = Object.logger;
    }

    findAutocomplete(workspace, rawArguments) {
        this.logger.log('rawArguments', rawArguments)

        let command = _.first(rawArguments);
        let commandStarts = new RegExp(`^${this.reEscape(command)}`, 'igm');

        return Promise.resolve()
            .then(() => {
                return workspace.actions.find((action) => {
                    // this.logger.log('action', action)
                    // this.logger.log('command', command)

                    if (!command) {
                        return true;
                    }

                    if (command == action.name) {
                        action.active = true;
                        return true;
                    }

                    if (commandStarts.test(action.name)) {
                        return true;
                    }
                });
            })
            .then((actions) => {
                let words = [];

                if (actions.length > 1) {
                    return actions.map((action) => action.name);
                } else if (actions.length == 1) {
                    let action = actions[0];

                    if (action.active) {
                        // words = words.concat(action.arguments);
                        //    TODO

                        words = action.arguments;

                        this.logger.log('action', action)
                    } else {
                        words.push(action.name);
                    }
                    return words;
                } else {
                    return [];
                }
            });
    }

    reEscape(text) {
        return ('' + text).replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }

}
