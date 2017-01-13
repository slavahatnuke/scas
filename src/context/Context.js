module.exports = class Context {
    constructor() {
        this.cwd = null;
        this.request = null;
        this.config = null;
        this.configPath = './.scas';
    }
}
