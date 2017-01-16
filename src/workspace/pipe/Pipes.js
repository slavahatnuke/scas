let _ = require('lodash');

module.exports = class Pipes {
    constructor() {
        this.pipes = {};
    }

    load(context) {
        return Promise.resolve()
            .then(() => this.loadPipes(context, require('../../../pipes/pipes')))
            .then(() => this.loadPipes(context, context.config.pipes || {}))
            .then(() => this);
    }

    loadPipes(context, pipes) {
        _.each(pipes, (pipe, name) => {
            this.pipes[name] = (...args) => {
                if (_.isFunction(pipe)) {
                    let _pipe = pipe(context);

                    if (_.isFunction(_pipe)) {
                        return _pipe.apply(null, args);
                    } else {
                        return '--wrong pipe--';
                    }
                }

                return '--wrong pipe declaration--';
            }
        });
    }

    getPipes() {
        return this.pipes;
    }
}
