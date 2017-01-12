var minimist = require('minimist');

var scas = {
    run: function () {
        var argv = minimist(process.argv.slice(2));
        console.dir(argv);
    }
};

module.exports = scas;