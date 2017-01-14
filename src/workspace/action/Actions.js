let Action = require('./Action');
let _ = require('lodash');

module.exports = class Actions {
    constructor() {
        this.actions = []
    }

    load(context) {
        return Promise.resolve()
            .then(() => {
                _.each(context.config.actions, (value, name) => {
                    value.name = (''+name).trim();
                    this.actions.push(new Action(value))
                });
            })
            .then(() => this);
    }

    find(finder) {
        finder = finder || function () {
                return true;
            };

        return Promise.resolve()
            .then(() => this.actions.filter(finder));
    }
}
