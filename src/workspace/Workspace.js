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
            .then(() => this.imports = new Imports().load(context))
            .then(() => this.actions = new Actions().load(context))
            .then(() => this.pipes = new Pipes().load(context))
            .then(() => this);
    }

}
