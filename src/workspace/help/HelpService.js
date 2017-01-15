let Hint = require('./Hint');
let _ = require('lodash');

module.exports = class HelpService {
    constructor() {

    }

    actionsHelp(workspace, actions) {
        let result = new Hint('Help');

        return Promise.resolve()
            .then(() => {
                return Promise.all(actions.map((action) => this.actionHelp(workspace, action)))
            })
            .then((helps) => {
                helps.map((help) => {
                    help.name = 'Help11';
                    result.add(help)
                })
            })
            .then(() => result);
    }

    actionHelp(workspace, action) {
        return Promise.resolve()
            .then(() => {
                let result = new Hint('Help');

                let actionHint = new Hint(action.name);

                actionHint.title = action.title;
                actionHint.description = action.description;
                actionHint.help = action.help;

                let actionRequires = action.getRequires();
                if (actionRequires.length) {
                    let requireHint = new Hint('requires');
                    requireHint.title = actionRequires.join(', ');
                    actionHint.add(requireHint);
                }

                actionHint.title = action.title;
                actionHint.description = action.description;
                actionHint.help = action.help;

                result.add(actionHint);

                return result;
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
                    actionHint.title = action.title;
                    actionHint.description = action.description;
                    hint.add(actionHint);
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

                if (hint.description) {
                    console.log(`${this.renderOffset(hint.description, descriptionOffset)}`);
                    console.log('');
                }

                if (hint.help) {
                    console.log(`${this.renderOffset(hint.help, helpOffset)}`);
                    console.log('');
                }

                let hints = hint.getHints();
                return Promise.all(hints.map((hint) => this.renderHint(hint)))
                    .then(() => {
                        if (hints.length) {
                            console.log('');
                        }
                    });

            });
    }
}