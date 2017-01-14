let Logger = require('./Logger');

module.exports = class FileLogger extends Logger {
    constructor() {
        super();
    }

    log(message, data) {
        var data = JSON.stringify(message, null, 2) + '\n';

        if(arguments.length > 1) {
            data = JSON.stringify(Array.prototype.slice.call(arguments), null, 2) + '\n';
        }

        require('fs').appendFileSync('file.log', data)
    }
};
