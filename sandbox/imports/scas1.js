module.exports = {
    title: 'Imported command title',
    description: `Imported description`,
    help: 'There is help',

    imports: [{
        path: 'scas2',
        as: 'vat'
    }],
    actions: {
        abc: {
            title: 'Imported 1 command',
            help: 'abc help',
            arguments: ['dir', 'name'],
            input: 'template/im.js',
            out: '{{{ dir }}}/{{{ name }}}.im.class.js'
        },
        def: {
            title: 'Imported 2 command'
        }
    }
}