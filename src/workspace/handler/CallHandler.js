let Handler = require('./Handler');

module.exports = class CallHandler extends Handler {
    constructor() {
        super();
    }

    handle(workspace, request) {
        return super.handle(workspace);
    }
}
