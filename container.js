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

container.add('workspace.AutoCompleteHandler', require('./src/workspace/handler/AutoCompleteHandler'), [
    'workspace.action.Matcher'
]);

container.add('workspace.CallHandler', require('./src/workspace/handler/CallHandler'), [
    'workspace.action.Matcher',
    'HelpService'
]);
container.add('workspace.action.Matcher', require('./src/workspace/action/Matcher'), []);

container.add('HelpService', require('./src/workspace/help/HelpService'), [
    'workspace.action.Matcher'
]);

module.exports = container;
