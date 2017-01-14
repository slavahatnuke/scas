module.exports = {
    title: '$ scas [actions] <arguments> <options>',
    description: `It is scaffolding console 
It should help you to improve development skills :) `,
    help: 'scas|scs help TBD',

    actions: {
        help: {
            title: 'Help',
            description1: `
Help about this command to make sure that you understand it please call --help 
it will give you some exmaplesn it will give you some exmaples
`,
            help: 'Its big help when you call --help',
            aliases: ['--help', '-h']
        }
        ,
        'completion': {
            description: `
            install completion it will speed up your console
`,
            title: 'Install this util',
            help: 'Its big help when you call --help'
        }
    },
    pipes: {
        camelCase: (context) => (input) => 'camelCaseValueNeedToBeReturned'
    }
};