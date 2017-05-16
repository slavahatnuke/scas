module.exports = {
    title: '$ scas [actions] <arguments> <options>',
    description: 'Scaffolding console',

    // comment this
    imports: [{
        path: 'scas-angular'
    }],

    actions: {
        help: {
            title: 'Help',
            help: '$ scas',
        },
        init: {
            title: 'Init .scas.js',
            in: 'scas/init.js',
            out: '.scas.js'
        },
        version: {
            title: 'Show scas version',
            call: (query) => console.log(require('./package.json').version)
        },

        '--completion-help': {
            title: 'Completion help',
            help: `
## Setup automaticaly
$ scas --completion-install

## Or setup manually
$ scas --completion > your/cutom/path/scas.completion.sh

## Add to your ~/.profile or ~/.bash_profile or ~/.bashrc
source your/cutom/path/scas.completion.sh

## Please restart your terminal
`
        },
        '--completion-install': {
            title: 'Install bash completion'
        },
        '--completion': {
            title: 'Show bash completion'
        }
    }
}