let Container = require('plus.container');
let container = new Container();

container.add('Scas', require('./src/Scas'), ['config.Loader', 'WorkspaceService']);

container.add('CLI', require('./src/cli/CLI'), ['CLI.parser', 'Scas']);
container.add('CLI.parser', require('./src/cli/Parser'), []);
container.add('config.Loader', require('./src/config/Loader'), []);

container.add('WorkspaceService', require('./src/workspace/WorkspaceService'), [
    'workspace.AutoCompleteHandler',
    'workspace.CallHandler'
]);

container.add('workspace.AutoCompleteHandler', require('./src/workspace/handler/AutoCompleteHandler'), []);
container.add('workspace.CallHandler', require('./src/workspace/handler/CallHandler'), []);

module.exports = container;
