module.exports = class Request {
    constructor() {
        this.rawArguments = [];
        this.arguments = [];
        this.options = {};

        this.cwd = process.cwd()
    }
}
