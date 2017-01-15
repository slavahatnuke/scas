let _ = require('lodash');

module.exports = class Action {
    constructor(config) {
        this.config = config;
        this.workspace = null;

        this.name = config.name || null;
        this.title = config.title || null;
        this.description = config.description || null;
        this.help = config.help || null;
        this.example = config.example || null;

        this.input = config.input || null;
        this.out = config.out || null;

        this.prepareArguments(config);
        this.prepareOptions(config);

        this.active = false;
    }

    prepareOptions(config) {
        this.options = (config.options || []).map((option) => {
            return {
                name: option,
                title: null,
                description: null,
                active: false,
                value: null
            };
        });
    }

    prepareArguments(config) {
        this.arguments = (config.arguments || []).map((name) => {
            return {
                name: name,
                title: null,
                description: null,
                active: false,
                value: null
            };
        });
    }

    getParameters(defaults) {
        let params = defaults || {};

        this.arguments.map((argument) => {
            params[argument.name] = argument.value;
        });

        this.options.map((option) => {
            params[option.name] = option.value;
        });

        return params;
    }

    isValid() {
        return _.every(this.arguments, (arg) => arg.active && arg.value !== null);
    }

    getRequires() {
        return this.arguments
            .filter((arg) => !arg.active || arg.value == null)
            .map((arg) => arg.name);
    }
}
