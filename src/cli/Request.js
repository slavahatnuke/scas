module.exports = class Request {
    constructor() {
        this.rawArguments = [];
        this.arguments = [];
        this.options = {};
        this.autocomplete = false;
        this.cwd = process.cwd()
    }

    hasOption(option) {
        return this.rawArguments.includes(option);
    }
}
