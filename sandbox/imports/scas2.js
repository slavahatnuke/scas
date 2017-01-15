module.exports = {
    title: '[2] Imported command title',
    description: `[2] Imported description`,
    help: '[2] There is help',

    actions: {
        im: {
            title: '[2] Imported command',
            arguments: ['name', 'dir'],
            input: 'template/im.js',
            out: '{{{ dir }}}/{{{ name }}}.class.js'
        }
    }
}