let Hint = require('./Hint');

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
}