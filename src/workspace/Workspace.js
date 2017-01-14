let Imports = require('./import/Imports');
let Actions = require('./action/Actions');
let Pipes = require('./pipe/Pipes');

module.exports = class Workspace {
    constructor() {
        this.context = null;
        this.imports = null;
        this.actions = null;
        this.pipes = null;
    }

    load(context) {
        return Promise.resolve()
            .then(() => new Imports().load(context))
            .then((imports) => this.imports = imports)

            .then(() => new Actions().load(context))
            .then((actions) => this.actions = actions)

            .then(() => new Pipes().load(context))
            .then((pipes) => this.pipes = pipes)

            .then(() => this);
    }

}
