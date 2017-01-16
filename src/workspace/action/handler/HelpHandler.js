let Handler = require('./Handler');
let Hint = require('../../help/Hint');

module.exports = class HelpHandler extends Handler {
    constructor(helpService) {
        super();
        this.helpService = helpService;
    }

    handle(workspace, action, request) {
        return Promise.resolve()
            .then(() => this.helpService.actionHelp(workspace, action));
    }

    supports(workspace, action) {
        return true;
    }

}

module.exports.$tags = ['action', 'handler'];