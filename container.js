let Container = require('plus.container');
let container = new Container();

container.add('Scas', require('./src/Scas'), ['config.Loader']);

container.add('CLI', require('./src/cli/CLI'), ['CLI.parser', 'Scas']);
container.add('CLI.parser', require('./src/cli/Parser'), []);
container.add('config.Loader', require('./src/config/Loader'), []);

module.exports = container;
