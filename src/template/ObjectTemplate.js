let Accessor = require('plus.container').Accessor;
let Template = require('./Template');
let _ = require('lodash');

module.exports = class ObjectTemplate {
    constructor(object, context) {
        this.object = object || '';
        this.context = context || {};
        this.accessor = new Accessor();
        this.pipes = {};
    }

    setPipes(pipes) {
        return Promise.resolve()
            .then(() => {
                _.assign(this.pipes, pipes)
            })
            .then(() => this);
    }

    get(name) {
        return Promise.resolve()
            .then(() => this.accessor.get(this.object, name))
            .then((value) => {
                let template = new Template(value);
                return Promise.resolve()
                    .then(() => template.setPipes(this.pipes))
                    .then(() => template);
            })
            .then((template) => template.render(this.context));
    }
}
