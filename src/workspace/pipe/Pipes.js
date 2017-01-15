let _ = require('lodash');

module.exports = class Pipes {
    constructor() {
        this.pipes = {}
    }

    load(context) {
        return Promise.resolve()
            .then(() => {
                let pipes = context.config.pipes || {};
                _.each(pipes, (pipe, name) => {
                    this.pipes[name] = (input) => {
                        if (_.isFunction(pipe)) {
                            let _pipe = pipe(context);

                            if (_.isFunction(_pipe)) {
                                return _pipe(input);
                            } else {
                                return '--wrong pipe--';
                            }
                        }

                        return '--wrong pipe declaration--';
                    }
                });
            })
            .then(() => this);
    }

    getPipes() {
        return this.pipes;
    }
}
