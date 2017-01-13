let _ = require('lodash');

module.exports = class Config {
    constructor(data) {
        this.description = '';
        this.help = '';

        this.imports = [];
        this.actions = {};
        this.pipes = {};

        this.apply(data || {});
    }

    apply(data) {
        _.merge(this, data || {})
    }

}
