module.exports = class Action {
    constructor(config) {
        this.name = config.name || null;
        this.title = config.title || null;
        this.description = config.description || null;
        this.help = config.help || null;
        this.example = config.example || null;

        this.prepareArguments(config);
        this.options = config.options || [];

        this.active = false;
    }

    prepareArguments(config) {
        this.arguments = (config.arguments || []).map((name) => {
            return {
                name: name,
                title: null,
                description: null,
                active: false
            };
        });
    }


}
