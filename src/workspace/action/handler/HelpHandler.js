let Handler = require('./Handler');
let Hint = require('../../help/Hint');

module.exports = class HelpHandler extends Handler {
    constructor() {
        super();
    }

    handle(workspace, action, request) {
        return Promise.resolve().then(() => new Hint(action.help));
    }

    supports(workspace, action, request) {
        return true;
    }

}

module.exports.$tags = ['action', 'handler'];