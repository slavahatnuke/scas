module.exports = {
    title: '$ scas - is cli helper',
    description: 'more info here',
    actions: {
        help: {
            title: 'Help',
            description: 'more info here',
            help: 'HELP here more info here',
        },
        init: {
            title: 'Init .scas.js',
        },
        class: {
            title: 'Class maker',
            arguments: ['dir', 'name'],
            input: 'sandbox/class.js',
            out: '{{{ dir }}}/{{{ name | Camel }}}.class.js'
        },
        module: {
            title: 'Module maker',
            arguments: ['dir', 'name'],
            batch: [
                {
                    name: 'class',
                    map: {
                        dir: '{{{ dir }}}',
                        name: '{{{ name }}}'
                    }
                },
                {
                    name: 'class',
                    map: {
                        dir: '{{{ dir }}}',
                        name: '{{{ name }}}Module'
                    }
                }
            ]
        }
    },
    imports: [
        {
            path: 'sandbox/imports/scas2',
        },
        {
            path: 'sandbox/imports/scas2',
            as: 'ng'
        },
        {
            path: 'sandbox/imports/scas2',
            as: 'project'
        }
    ]
}