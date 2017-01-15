module.exports = {
    title: 'Imported command title',
    description: `Imported description`,
    help: 'There is help',

    actions: {
        abc: {
            title: 'Imported 1 command',
            help: 'abc help',
            arguments: ['dir', 'name']
        },
        def: {
            title: 'Imported 2 command'
        }
    }
}