module.exports = class Action {
    constructor(config) {
        this.name = config.name || null;
        this.title = config.title || null;
        this.description = config.description || null;
        this.help = config.help || null;
        this.example = config.example || null;

        this.arguments = config.arguments || [];
        this.options = config.options || [];

        this.active = false;
    }

    getAutocomplete(request) {
        return Promise.resolve().then(() => this.name);
    }

}
