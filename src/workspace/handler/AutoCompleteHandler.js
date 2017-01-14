let _ = require('lodash');
let minimist = require('minimist');
let spawnArgs = require('spawn-args');
let omelette = require('omelette');

let Handler = require('./Handler');

module.exports = class AutoCompleteHandler extends Handler {
    constructor(actionMatcher) {
        super();

        this.actionMatcher = actionMatcher;
    }

    handle(workspace, request) {
        return Promise.resolve()
            .then(() => {
                let self = this;

                let argv = this.parse(request);
                let names = argv._;

                let length = names.length + 1;
                let rangeLength = length > 0 ? length : 1;

                let range = _.range(rangeLength).map((i) => 'action' + i);
                let expected = range.map((name) => `<${name}>`).join(' ');
                let complete = omelette("scas " + expected);

                let words = [];

                range.map((name) => {
                    complete.on(name, function () {
                        this.reply(words);
                    });
                });

                Promise.resolve()
                    .then(() => {
                        return self.actionMatcher.findByRawArguments(workspace, names)
                            .then((actions) => {
                                let promises = actions.map((action) => action.getAutocomplete(request));

                                return Promise.all(promises)
                                    .then((results) => {
                                        words = results.filter((result) => !!result);
                                    })
                            })
                    })
                    .then(() => {
                        complete.init();
                    });
                //
                //
                // require('fs').writeFileSync('autocomplate.log', JSON.stringify([
                //         request,
                //         argv
                //     ]) + '\n')

// // If you want to have a setup feature, you can use `omeletteInstance.setupShellInitFile()` function.
//                 if (process.argv.indexOf('--setup')) {
//                     complete.setupShellInitFile();
//                     console.log('done');
//                 }

            });
    }

    parse(request) {
        let args1 = minimist(request.rawArguments)._;
        let argsText = _.last(args1);

        let args = spawnArgs(argsText);
        args.shift();

        return minimist(args);
    }
}
