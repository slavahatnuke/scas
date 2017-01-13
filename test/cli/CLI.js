let container = require('../../container');
let CLI = container.CLI;

describe('cli/CLI', () => {
    it('run raw request', () => {
        return CLI.run([
            'hello',
            '--flag',
            '--option',
            'optValue'
        ]).then(() => {

        });
    })
})