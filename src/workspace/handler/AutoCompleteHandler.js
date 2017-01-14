let _ = require('lodash');
let minimist = require('minimist');
let spawnArgs = require('spawn-args');
let omelette = require('omelette');

let Handler = require('./Handler');

module.exports = class AutoCompleteHandler extends Handler {
    constructor(autocompleter) {
        super();

        this.autocompleter = autocompleter;
    }

    handle(workspace, request) {
        return Promise.resolve()
            .then(() => {
                if (request.hasOption('--completion-install')) {
                    return this.install(workspace);
                } else {
                    return Promise.resolve()
                        .then(() => {
                            let self = this;

                            let argv = this.parse(request);
                            let names = argv._;

                            let length = names.length + 1;
                            let rangeLength = length > 0 ? length : 1;
                            let range = _.range(rangeLength).map((i) => 'action' + i);

                            let expected = range.map((name) => `<${name}>`).join(' ');
                            let complete = this.getCompleter(workspace, expected);

                            let words = [];

                            range.map((name) => {
                                complete.on(name, function () {
                                    this.reply(words);
                                });
                            });

                            return Promise.resolve()
                                .then(() => {
                                    return this.autocompleter.findAutocomplete(workspace, names)
                                        .then((theWords) => words = theWords)
                                })
                                .then(() => {
                                    complete.init();
                                })
                                .then(() => process.exit(0));
                        });
                }
            });
    }

    getCompleter(workspace, expected) {
        let bin = workspace.isScsBin() ? 'scs' : 'scas';
        this.complete = omelette(bin + ' ' + expected || "<names>");
        return this.complete;
    }

    parse(request) {
        let args1 = minimist(request.rawArguments)._;
        let argsText = _.last(args1);

        let args = spawnArgs(argsText);
        args.shift();

        return minimist(args);
    }

    install(workspace) {
        return Promise.resolve()
            .then(() => {
                console.log('Installing completion ...');
                console.log('Completion has been installed.');
                this.getCompleter(workspace).setupShellInitFile()
            });
    }
}
