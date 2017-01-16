let Hint = require('./Hint');
let _ = require('lodash');
let async = require('async');

module.exports = class HelpService {
    constructor(importLoader) {
        this.importLoader = importLoader;
    }

    actionsHelp(workspace, actions) {
        let result = new Hint('');

        return Promise.resolve()
            .then(() => {
                return Promise.all(actions.map((action) => this.actionHelp(workspace, action)))
            })
            .then((helps) => {
                helps.map((help) => {
                    help.name = '';
                    result.add(help)
                })
            })
            .then(() => result);
    }

    actionHelp(workspace, action) {
        return Promise.resolve()
            .then(() => {
                let result = new Hint('');

                return Promise.resolve()
                    .then(() => {
                        let actionHint = new Hint(action.name);
                        result.add(actionHint);

                        actionHint.title = action.title;
                        actionHint.description = action.description;
                        actionHint.help = action.help;

                        let actionRequires = action.getRequires();
                        if (actionRequires.length) {
                            let requireHint = new Hint('requires');
                            requireHint.title = actionRequires.join(', ');
                            actionHint.add(requireHint);
                        }

                        return actionHint;
                    })
                    .then((actionHint) => {
                        if (action.nestedImport) {
                            return Promise.resolve()
                                .then(() => this.importLoader.load(action.workspace))
                                .then(() => action.workspace.actions.find())
                                .then((actions) => this.help(action.workspace))
                                .then((help) => actionHint.add(help));
                        }
                    })
                    .then(() => result);
            });
    }

    help(workspace) {
        let hint = new Hint(workspace.title);
        hint.description = workspace.description;

        return Promise.resolve()
            .then(() => workspace.actions.find())
            .then((actions) => {
                actions.map((action) => {
                    let actionHint = new Hint(action.name);
                    hint.add(actionHint);
                    actionHint.title = action.title;
                    actionHint.description = action.description;
                });
            })
            .then(() => hint)
    }

    renderOffset(text, offset) {
        offset = offset >= 0 ? offset : 0;
        return ('' + text).trim().split(/\n/igm).map((line) => _.repeat(' ', offset) + line.trim()).join('\n');
    }

    renderHint(hint) {
        return Promise.resolve()
            .then(() => {

                let titleOffsetLength = 25;

                let leftOffset = hint.level * 4;
                let titleOffset = leftOffset + titleOffsetLength - hint.name.length;
                let descriptionOffset = leftOffset + 2;
                let helpOffset = leftOffset + 4;

                console.log(`${this.renderOffset(hint.name, leftOffset)}${this.renderOffset(hint.title, titleOffset)}`);

                if (!hint.help && hint.description) {
                    console.log(`${this.renderOffset(hint.description, descriptionOffset)}`);
                    console.log('');
                }

                if (hint.help) {
                    console.log(`${this.renderOffset(hint.help, helpOffset)}`);
                    console.log('');
                }

                let hints = hint.getHints();
                return new Promise((resolve, reject) => {
                    async.eachSeries(hints, (hint, next) => {
                        this.renderHint(hint).then(() => next()).catch(next)
                    }, (err) => err ? reject(err) : resolve())
                });

                // require('as').
                //
                // return Promise.all(hints.map((hint) => this.renderHint(hint)))
                //     .then(() => {
                //         if (hints.length) {
                //             // console.log('');
                //         }
                //     });

            });
    }
}