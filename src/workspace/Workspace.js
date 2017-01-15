let Imports = require('./import/Imports');
let Actions = require('./action/Actions');
let Pipes = require('./pipe/Pipes');

module.exports = class Workspace {
    constructor() {
        this.title = null;
        this.description = null;
        this.help = null;

        this.context = null;
        this.imports = null;
        this.actions = null;
        this.pipes = null;
    }

    isScsBin() {
        return process.argv.find((arg) => arg.indexOf('scs') >= 0);
    }

    load(context) {
        return Promise.resolve()
            .then(() => this.context = context)
            .then(() => new Imports().load(context))
            .then((imports) => this.imports = imports)

            .then(() => new Actions().load(context))
            .then((actions) => this.actions = actions)

            .then(() => new Pipes().load(context))
            .then((pipes) => this.pipes = pipes)

            .then(() => {
                this.title = context.config.title;
                this.description = context.config.description;
                this.help = context.config.help;
            })
            .then(() => this);
    }

}
