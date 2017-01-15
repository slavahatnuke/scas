module.exports = class {{{ name | Camel }}} {
    constructor() {
        this.{{{ name | camel | singular }}} = null;
        this.{{{ name | camel | plural}}} = [];
    }
}
