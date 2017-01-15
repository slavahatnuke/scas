let Import = require('./Import');

module.exports = class Imports {
    constructor() {
        this.imports = [];
    }

    load(workspace, context) {
        return Promise.resolve()
            .then(() => context.config.imports || [])
            .then((imports) => {
                return Promise.all(imports.map((aImport) => {
                    return Promise.resolve()
                        .then(() => {
                            this.imports.push(new Import(aImport));
                        });
                }));
            })
            .then(() => this);
    }

    map(mapper) {
        return this.imports.map((aImport) => mapper(aImport))
    }
}
