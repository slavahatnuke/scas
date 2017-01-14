let Handler = require('./Handler');

module.exports = class CallHandler extends Handler {
    constructor(actionMatcher) {
        super();
        this.actionMatcher = actionMatcher;
    }

    handle(workspace, request) {
        return this.actionMatcher.match(workspace, request)
            .then((action) => {

            });
    }
}
