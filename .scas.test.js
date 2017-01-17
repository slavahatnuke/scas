let _ = require('lodash');
let pluralize = require('pluralize');


module.exports = {
    title: '$ scas [actions] <arguments> <options>',
    description: `It is scaffolding console 
It should help you to improve development skills :) `,
    help: 'scas|scs help TBD',


    imports: [
        {
            path: 'sandbox/imports/scas1',
            as: 'imported'
        },
        {
            path: 'sandbox/imports/scas2'
        }
    ],

    actions: {
        help: {
            title: 'Help',
            description: `
Help about this command to make sure that you understand it please call help 
it will give you some exmaplesn it will give you some exmaples
`,
            help: 'tap $ `scas --completion` or once `scas --completion-install` and reload terminal'
        },
//         'install-it': {
//             description: `
//             install completion it will speed up your console
// `,
//             title: 'Install this util',
//             help: 'Its big help when you call --help'
//         },
//         hep: {
//             title: 'Hep is help tester'
//         },
        component: {
            title: 'Generates component',
            arguments: ['name', 'dir'],
            description: `Some info here`,
            help: `It will generate component in this way`,
            input: 'sandbox/generate/generate.txt',
            out: '{{{ dir }}}/{{{ name }}}.component.js'
        },
        'class': {
            title: 'Class maker',
            arguments: ['name', 'dir'],
            help: `It generates ES6 class`,
            input: 'sandbox/es6/class.js',
            out: '{{{ dir }}}/{{{ name | Camel }}}.class.js'
        },
        module: {
            title: 'Module',
            arguments: ['dir', 'name', 'className'],
            batch: [
                'component',
                {
                    name: 'class',
                    map: {
                        name: 'Hoppa {{{ className }}}',
                        dir: `
{{{ dir }}}/{{{ className | toArray | first | toString | Camel }}}/{{{ className | toArray | slice(1) | toString | lower }}}
`
                    }
                }
            ]
        }
    },
    pipes: {
        scasCustomPipe: (context) => (input) => 'scasCustomPipe:' + input
    }
};