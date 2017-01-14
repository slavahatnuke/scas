module.exports = class Matcher {
    constructor() {

    }

    match(workspace, request) {
        return this.find(workspace, request);
    }

    find(workspace, request) {
        return this.findArguments(workspace, request.rawArguments);
    }

    findArguments(workspace, rawArguments) {
        let input = rawArguments.join(' ');

        return workspace.actions.find((action) => {
            let reAction = new RegExp(`^${this.reEscape(action.name)}$`, 'igm');
            return reAction.test(input);
        });
    }

    reEscape(text) {
        return ('' + text).split('').map((i) => '\\' + i).join('');
    }
}
