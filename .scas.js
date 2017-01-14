module.exports = {
    description: 'Help',
    help: 'Its help - TBD',

    actions: {
        help: {
            description: 'Help',
            help: 'Its help - TBD',
            aliases: ['--help', '-h']
        }
    },
    pipes: {
        camelCase: (context) => (input) => 'camelCaseValueNeedToBeReturned'
    }
};