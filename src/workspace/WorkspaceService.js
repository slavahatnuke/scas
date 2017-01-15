let Workspace = require('./Workspace');
let Hint = require('./help/Hint');
let _ = require('lodash');

module.exports = class WorkspaceService {
    constructor(autoCompleteHandler, callHandler) {
        this.autoCompleteHandler = autoCompleteHandler;
        this.callHandler = callHandler;
    }

    handle(workspace, request) {
        return Promise.resolve()
            .then(() => {
                return request.hasOption('--compbash')
                    || request.hasOption('--compgen')
                    || request.hasOption('--completion-install')
                    || request.hasOption('--completion')
            })
            .then((isAutoComplete) => request.autocomplete = isAutoComplete)
            .then(() => this.getHandler(workspace, request))
            .then((handler) => handler.handle(workspace, request))
            .then((result) => this.render(result))
            .catch((error) => this.renderError(error));
    }

    create(context) {
        let workspace = new Workspace();
        workspace.context = context;
        // ??? context.workspace = workspace

        return Promise.resolve()
            .then(() => workspace.load(context));
    }

    getHandler(workspace, request) {
        return Promise.resolve()
            .then(() => {
                if (request.autocomplete) {
                    return this.autoCompleteHandler;
                } else {
                    return this.callHandler;
                }
            });
    }

    render(result) {
        if (result instanceof Hint) {
            return this.renderHint(result);
        } else {
            console.log('>> result', result);
        }
    }

    renderError(error) {
        console.error(error, error.stack);
    }

    renderOffset(text, offset) {
        offset = offset >= 0 ? offset : 0;
        return ('' + text).trim().split(/\n/igm).map((line) => _.repeat(' ', offset) + line.trim()).join('\n');
    }

    renderHint(hint) {
        return Promise.resolve()
            .then(() => {

                let titleOffsetLength = 25;

                let leftOffset = hint.level * 4;
                let titleOffset = leftOffset + titleOffsetLength - hint.name.length;
                let descriptionOffset = leftOffset + 2;
                let helpOffset = leftOffset + 4;

                console.log(`${this.renderOffset(hint.name, leftOffset)}${this.renderOffset(hint.title, titleOffset)}`);

                if (hint.description) {
                    console.log(`${this.renderOffset(hint.description, descriptionOffset)}`);
                    console.log('');
                }

                if (hint.help) {
                    console.log(`${this.renderOffset(hint.help, helpOffset)}`);
                    console.log('');
                }

                let hints = hint.getHints();
                return Promise.all(hints.map((hint) => this.renderHint(hint)))
                    .then(() => {
                        if (hints.length) {
                            console.log('');
                        }
                    });

            });
    }
}
