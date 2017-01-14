module.exports = class Matcher {
    constructor() {

    }

    match(workspace, request) {
        return this.find(workspace, request)
            .then((actions) => {
                console.log(actions);
            });
    }

    find(workspace, request) {
        return this.findByRawArgumentsStrict(workspace, request.rawArguments);
    }

    findByRawArgumentsStrict(workspace, rawArguments) {
        let input = rawArguments.join(' ');

        return workspace.actions.find((action) => {
            let reAction = new RegExp(`^${this.reEscape(action.name)}$`, 'igm');
            return reAction.test(input);
        });
    }

    findByRawArguments(workspace, rawArguments) {
        let input = rawArguments.join(' ');
        let reInput = new RegExp(`^${this.reEscape(input)}`, 'igm');

        return workspace.actions.find((action) => {
            let reAction = new RegExp(`^${this.reEscape(action.name)}$`, 'igm');
            return !input || reAction.test(input) || reInput.test(action.name);
        });
    }

    reEscape(text) {
        return (''+text).split('').map((i) => '\\' + i).join('');
    }
}
