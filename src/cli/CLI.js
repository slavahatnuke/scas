module.exports = class CLI {
    constructor(parser, app) {
        this.parser = parser;
        this.app = app;
    }

    run(rawArguments) {
        return this.parser.parse(rawArguments)
            .then((request) => this.app.handle(request));
    }
}
