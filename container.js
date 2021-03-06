let Container = require('plus.container');
let container = new Container();

container.add('systemDir', __dirname);

container.add('Scas', require('./src/Scas'), ['config.Loader', 'WorkspaceService']);
container.add('ImportScas', require('./src/Scas'), ['config.Loader', 'WorkspaceService']);

container.add('CLI', require('./src/cli/CLI'), ['CLI.parser', 'Scas']);
container.add('CLI.parser', require('./src/cli/Parser'), []);
container.add('config.Loader', require('./src/config/Loader'), ['systemDir']);

container.add('WorkspaceService', require('./src/workspace/WorkspaceService'), [
    'workspace.AutoCompleteHandler',
    'workspace.CallHandler',
    'HelpService',
    'import.Loader'
]);

container.add('workspace.AutoCompleteHandler', require('./src/workspace/handler/AutoCompleteHandler'), [
    'Autocompleter'
]);

container.add('workspace.CallHandler', require('./src/workspace/handler/CallHandler'), [
    'workspace.action.Matcher',
    'HelpService',
    'workspace.action.handlers'
]);

container.add('workspace.action.Matcher', require('./src/workspace/action/Matcher'), ['import.Loader']);
container.add('workspace.action.handlers', (container) => container.find(['action', 'handler']), ['container']);

container.add('workspace.action.BatchHandler', require('./src/workspace/action/handler/BatchHandler'), [
    'HelpService',
    'workspace.action.Matcher',
    'TemplateService'
]);

container.add('workspace.action.CallHandler', require('./src/workspace/action/handler/CallHandler'), ['TemplateService']);
container.add('workspace.action.GenerateHandler', require('./src/workspace/action/handler/GenerateHandler'), ['TemplateService']);
container.add('workspace.action.HelpHandler', require('./src/workspace/action/handler/HelpHandler'), ['HelpService']);


container.add('HelpService', require('./src/workspace/help/HelpService'), [
    'import.Loader'
]);

container.add('Autocompleter', require('./src/workspace/autocomplete/Autocompleter'), [
    'workspace.action.Matcher',
    'import.Loader'
]);

container.add('Logger', require('./src/logger/_logger'));
Object.logger = container.Logger;

container.add('TemplateService', require('./src/template/TemplateService'));

container.add('import.Loader', require('./src/workspace/import/Loader'), [
    'config.Loader'
]);

module.exports = container;
