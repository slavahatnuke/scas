let _ = require('lodash');

module.exports = class Config {
    constructor(data) {
        this.description = '';
        this.help = '';

        this.imports = [];
        this.actions = {};
        this.pipes = {};

        this._path = null;
        this._dir = null;

        this.apply(data || {});
    }

    get dir() {
        return this._dir;
    }

    set dir(value) {
        this._dir = value;
    }

    get path() {
        return this._path;
    }

    set path(value) {
        this._path = value;
        this.dir = require('path').dirname(this.path);
    }

    apply(data) {
        _.merge(this, data || {})
        return this;
    }

}
