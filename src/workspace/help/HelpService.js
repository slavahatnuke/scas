let Hint = require('./Hint');

module.exports = class HelpService {
    constructor(actionMatcher) {
        this.autocompleter = actionMatcher;
    }

    actionsHelp(workspace, actions) {
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