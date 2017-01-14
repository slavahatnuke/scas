module.exports = class Hint {
    constructor(name) {
        this._name = name;
        this._title = '';
        this._description = '';
        this._level = 0;

        this.hints = [];
    }

    get title() {
        return this._title || '';
    }

    set title(value) {
        this._title = value;
    }

    get level() {
        return this._level;
    }

    set level(value) {
        this._level = value;
    }

    get name() {
        return this._name || '';
    }

    set name(value) {
        this._name = value;
    }

    get description() {
        return this._description || '';
    }

    set description(value) {
        this._description = value;
    }

    add(hint) {
        hint._level = this._level + 1;
        this.hints.push(hint);
        return this;
    }

    getHints() {
        return this.hints;
    }
};
