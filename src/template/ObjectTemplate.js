let Accessor = require('plus.container').Accessor;
let Template = require('./Template');

module.exports = class ObjectTemplate {
    constructor(object, context) {
        this.object = object || '';
        this.context = context || {};
        this.accessor = new Accessor();
    }

    get(name) {
        return Promise.resolve()
            .then(() => this.accessor.get(this.object, name))
            .then((value) => new Template(value).render(this.context));
    }
}
