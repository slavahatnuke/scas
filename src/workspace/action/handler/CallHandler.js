let Handler = require('./Handler');
let Hint = require('../../help/Hint');
let _ = require('lodash');

module.exports = class CallHandler extends Handler {
    constructor(helpService) {
        super();
        this.helpService = helpService;
    }

    handle(workspace, action, request) {

        return Promise.resolve()
            .then(() => {
                if(_.isString(action.call)) {
                    return this.commandCall(workspace, action);
                } else if(_.isFunction(action.call)) {
                    return this.functionCall(workspace, action);
                }
            })
    }

    supports(workspace, action) {
        return _.isFunction(action.call) || _.isString(action.call);
    }

    commandCall(workspace, action) {

    }

    functionCall(workspace, action) {
        return Promise.resolve()
            .then(() => action.call(action.getParameters()));
    }
}

module.exports.$tags = ['action', 'handler'];