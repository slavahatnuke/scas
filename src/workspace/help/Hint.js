module.exports = class Hint {
    constructor(name) {
        this._name = name;
        this._title = '';
        this._description = '';
        this._help = '';

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

    get help() {
        return this._help || '';
    }

    set help(value) {
        this._help = value;
    }

    add(hint) {
        hint.level = this.level + 1;
        this.hints.push(hint);
        return this;
    }

    getHints() {
        this.hints.map((hint) => {
            hint.level = this.level + 1;
            hint.getHints();
        });
        return this.hints;
    }
};
