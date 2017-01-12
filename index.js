
var scas = {
    run: function () {
        var argv = require('minimist')(process.argv.slice(2));
        console.dir(argv);
    }
};

module.exports = scas;