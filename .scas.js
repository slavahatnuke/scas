let _ = require('lodash');
let pluralize = require('pluralize');


module.exports = {
    title: '$ scas [actions] <arguments> <options>',
    description: `It is scaffolding console 
It should help you to improve development skills :) `,
    help: 'scas|scs help TBD',

    actions: {
        help: {
            title: 'Help',
            description: `
Help about this command to make sure that you understand it please call --help 
it will give you some exmaplesn it will give you some exmaples
`,
            help: 'Its big help when you call --help'
        },
        'install-it': {
            description: `
            install completion it will speed up your console
`,
            title: 'Install this util',
            help: 'Its big help when you call --help'
        },
        hep: {
            title: 'Hep is help tester'
        },
        component: {
            title: 'Generates component',
            arguments: ['name', 'dir'],
            description: `Some info here`,
            help: `It will generate component in this way`,
            input: 'sandbox/generate/generate.txt',
            out: '{{{ dir }}}/{{{ name }}}.js'
        },
        'class': {
            title: 'Class maker',
            arguments: ['name', 'dir'],
            help: `It generates ES6 class`,
            input: 'sandbox/es6/class.js',
            out: '{{{ dir }}}/{{{ name | Camel }}}.js'
        }
    },
    pipes: {
        camel: (context) => (input) => _.camelCase(input),
        Camel: (context) => (input) => _.upperFirst(_.camelCase(input)),

        kebab: (context) => (input) => _.kebabCase(input),
        Kebab: (context) => (input) => _.upperFirst(_.kebabCase(input)),

        snake: (context) => (input) => _.snakeCase(input),
        Snake: (context) => (input) => _.upperFirst(_.snakeCase(input)),

        lower: (context) => (input) => _.toLower(input),
        upper: (context) => (input) => _.toUpper(input),

        toUpper: (context) => (input) => _.toUpper(input),
        toLower: (context) => (input) => _.toLower(input),

        camelCase: (context) => (input) => _.camelCase(input),
        kebabCase: (context) => (input) => _.kebabCase(input),
        snakeCase: (context) => (input) => _.snakeCase(input),
        startCase: (context) => (input) => _.startCase(input),

        lowerCase: (context) => (input) => _.lowerCase(input),
        upperCase: (context) => (input) => _.upperCase(input),

        lowerFirst: (context) => (input) => _.lowerFirst(input),
        upperFirst: (context) => (input) => _.upperFirst(input),

        capitalize: (context) => (input) => _.capitalize(input),
        trim: (context) => (input) => _.trim(input),

        trimStart: (context) => (input) => _.trimStart(input),
        trimEnd: (context) => (input) => _.trimEnd(input),

        plural: (context) => (input) => pluralize.plural(input),
        Plural: (context) => (input) => _.upperFirst(pluralize.plural(input)),

        singular: (context) => (input) => pluralize.singular(input),
        Singular: (context) => (input) => _.upperFirst(pluralize.singular(input))

    }
};