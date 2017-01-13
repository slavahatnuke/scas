let Request = require('./Request');
let minimist = require('minimist');

module.exports = class Parser {
    constructor() {
        
    }

    parse(rawArguments) {
        return Promise.resolve()
            .then(() => {
                let argv = minimist(rawArguments);
                let request = new Request();

                request.rawArguments = rawArguments;
                request.arguments = argv._;
                request.options = argv;

                return request;
            });
    }
}
