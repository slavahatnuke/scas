module.exports = {
    actions: {
        help: {
            description: 'Help',
            help: 'Its help - TBD'
        }
    },
    pipes: {
        camelCase: (context) => (input) => 'camelCaseValueNeedToBeReturned'
    }
};