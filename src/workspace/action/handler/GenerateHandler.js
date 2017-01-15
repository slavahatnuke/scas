let Handler = require('./Handler');
let Hint = require('../../help/Hint');
let fs = require('fs-extra');

let TemplateObject = require('../../../template/ObjectTemplate');
let Template = require('../../../template/Template');

module.exports = class GenerateHandler extends Handler {
    constructor() {
        super();
    }

    handle(workspace, action, request) {
        let result = new Hint();

        return Promise.resolve()
            .then(() => {

                let renderContext = action.getParameters({
                    $$context: workspace.context,
                    $$workspace: workspace
                });

                let $action = new TemplateObject(action, renderContext);

                return Promise.resolve()
                    .then(() => $action.get('input'))
                    .then((input) => {
                        let hint = new Hint('input');
                        hint.title = input;

                        result.add(hint);
                        return Promise.resolve()
                            .then(() => {
                                return new Promise((resolve, reject) => {
                                    fs.readFile(input, (err, data) => err ? reject(err) : resolve(data));
                                });
                            });
                    })
                    .then((input) => new Template(input).render(renderContext))
                    .then((out) => {
                        return Promise.resolve()
                            .then(() => $action.get('out'))
                            .then((outFile) => {

                                let hint = new Hint('out');
                                hint.title = outFile;
                                result.add(hint);

                                hint = new Hint('content');
                                hint.title = out.replace(/\n/igm, ' ').slice(0, 50) + '...';
                                result.add(hint);

                                return Promise.resolve()
                                    .then(() => {
                                        return new Promise((resolve, reject) => {
                                            fs.ensureFile(outFile, (err, data) => err ? reject(err) : resolve(data));
                                        });
                                    })
                                    .then(() => {
                                        return new Promise((resolve, reject) => {
                                            fs.writeFile(outFile, out, (err) => err ? reject(err) : resolve());
                                        });
                                    })
                            });
                    })
                    .then(() => result)
            });
    }

    supports(workspace, action, request) {
        // console.log(action);
        return action.input && action.out;
    }

}

module.exports.$tags = ['action', 'handler'];