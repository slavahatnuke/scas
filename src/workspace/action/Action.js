module.exports = class Action {
    constructor(config) {
        this.name = config.name || null;
        this.title = config.title || null;
        this.description = config.description || null;
        this.help = config.help || null;
        this.example = config.example || null;
    }

    load(xxx) {
        return Promise.resolve()
            .then(() => this);
    }

    getAutocomplete(request) {
        return Promise.resolve().then(() => this.name);
    }

}
