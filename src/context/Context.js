module.exports = class Context {
    constructor() {
        this.container = null;

        this.cwd = null;
        this.request = null;

        this.config = null;
        this.configPath = './.scas';
    }
}
