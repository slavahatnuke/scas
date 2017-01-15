let ObjectTemplate = require('./ObjectTemplate');
let Template = require('./Template');

module.exports = class TemplateService {
    constructor() {
        
    }

    getObjectTemplate(workspace, action, renderContext) {
        let template = new ObjectTemplate(action, renderContext);

        return Promise.resolve()
            .then(() => workspace.pipes.getPipes())
            .then((pipes) => template.setPipes(pipes))
            .then(() => template);
    }

    getTemplate(workspace, input) {
        return Promise.resolve()
            .then(() => {
                let template = new Template(input);
                return Promise.resolve()
                    .then(() => workspace.pipes.getPipes())
                    .then((pipes) => template.setPipes(pipes))
                    .then(() => template);
            });
    }
}
