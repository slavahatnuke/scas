module.exports = class CLI {
    constructor(parser, scas) {
        this.parser = parser;
        this.scas = scas;
    }

    run(rawArguments) {
        return this.parser.parse(rawArguments)
            .then((request) => this.scas.handle(request))
            .catch((err) => console.log(err, err.stack));
    }
}
