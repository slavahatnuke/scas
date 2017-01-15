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
    'Autocompleter'
]);

container.add('workspace.CallHandler', require('./src/workspace/handler/CallHandler'), [
    'workspace.action.Matcher',
    'HelpService',
    'workspace.action.handlers'
]);

container.add('workspace.action.Matcher', require('./src/workspace/action/Matcher'), []);
container.add('workspace.action.handlers', (container) => container.find(['action', 'handler']), ['container']);

container.add('workspace.action.GenerateHandler', require('./src/workspace/action/handler/GenerateHandler'), ['TemplateService']);
container.add('workspace.action.HelpHandler', require('./src/workspace/action/handler/HelpHandler'), ['HelpService']);


container.add('HelpService', require('./src/workspace/help/HelpService'), []);

container.add('Autocompleter', require('./src/workspace/autocomplete/Autocompleter'), [
    'workspace.action.Matcher'
]);

container.add('Logger', require('./src/logger/_logger'));
Object.logger = container.Logger;

container.add('TemplateService', require('./src/template/TemplateService'));

module.exports = container;
