module.exports = class Import {
    constructor(config) {
        this.as = config.as || null;
        this.path = config.path || null;
        this.dir = null;
    }
}
