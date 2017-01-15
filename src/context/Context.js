module.exports = class Context {
    constructor() {
        this.container = null;

        this.cwd = null;
        this.dir = null;

        this.request = null;

        this.config = null;
        this.configPath = './.scas';

        this.imported = false;
    }
}
