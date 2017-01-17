let Context = require('../../context/Context');
let Workspace = require('../Workspace');
let Action = require('../action/Action');

module.exports = class Loader {
    constructor(configLoader) {
        this.configLoader = configLoader;
    }

    load(workspace) {
        return Promise.resolve()
            .then(() => {
                return Promise.all(workspace.imports.map((aImport) => this.loadImport(workspace, aImport)));
            });
    }

    loadImport(workspace, aImport) {
        return Promise.resolve()
            .then(() => this.getImportContext(workspace, aImport))
            .then((context) => {
                return Promise.resolve()
                    .then(() => {
                        let importedWorkspace = new Workspace();

                        return Promise.resolve()
                            .then(() => importedWorkspace.load(context))
                            .then(() => {
                                if (aImport.as) {
                                    return this.nestedImport(workspace, importedWorkspace, aImport);
                                } else {
                                    return this.plainImport(workspace, importedWorkspace);
                                }
                            });
                    });
            });
    }

    nestedImport(workspace, importedWorkspace, aImport) {
        let importedAction = new Action(importedWorkspace.context.config);

        importedAction.name = aImport.as;
        importedAction.workspace = importedWorkspace;
        importedAction.nestedImport = true;

        return Promise.resolve()
            .then(() => workspace.actions.add(importedAction))
    }

    plainImport(workspace, importedWorkspace) {
        return Promise.resolve()
            .then(() => importedWorkspace.actions.find())
            .then((actions) => {
                return Promise.all(actions.map((action) => {
                    let importedAction = new Action(action.config);
                    importedAction.workspace = importedWorkspace;

                    return Promise.resolve()
                        .then(() => workspace.actions.add(importedAction))
                }));
            });
    }

    getImportContext(workspace, aImport) {
        let context = new Context();
        context.configPath = aImport.path;
        context.dir = workspace.context.dir;
        context.imported = true;

        return Promise.resolve()
            .then(() => this.configLoader.load(context))
            .then((config) => context.config = config)
            .then(() => context);
    }
}
