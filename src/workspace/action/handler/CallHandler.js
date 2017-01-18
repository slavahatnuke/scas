let Handler = require('./Handler');
let Hint = require('../../help/Hint');
let _ = require('lodash');

module.exports = class CallHandler extends Handler {
    constructor(templateService) {
        super();
        this.templateService = templateService;
    }

    handle(workspace, action, request) {

        return Promise.resolve()
            .then(() => {
                if (_.isString(action.call)) {
                    return this.commandCall(workspace, action);
                } else if (_.isFunction(action.call)) {
                    return this.functionCall(workspace, action);
                }
            })
    }

    supports(workspace, action) {
        return _.isFunction(action.call) || _.isString(action.call);
    }

    commandCall(workspace, action) {
        let exec = require('child_process').exec;

        return Promise.resolve()
            .then(() => this.templateService.getTemplate(workspace, action.call))
            .then((template) => template.render(action.getParameters()))
            .then((call) => {
                console.log('$', call);

                return new Promise((resolve, reject) => {
                    let options = {
                        maxBuffer: 1024 * 1024 * 1024
                    };

                    let child = exec(call, options, (error, stdout, stderr) => {
                        if (error) {
                            return reject(error);
                        }

                        let hint = new Hint(action.name);
                        hint.title = 'ok';

                        resolve(hint);
                    });

                    child.stdout.pipe(process.stdout);
                    child.stderr.pipe(process.stderr);
                });
            });
    }

    functionCall(workspace, action) {
        return Promise.resolve()
            .then(() => action.call(action.getParameters()));
    }
}

module.exports.$tags = ['action', 'handler'];