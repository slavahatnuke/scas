module.exports = {
    title: '$ scas [actions] <arguments> <options>', // you can rewrite this for you goals
    description: 'Scaffolding console', // you can rewrite this for you goals

    imports: [
        // it needed to support default help
        { path: 'scas/.scas' }
    ],
    actions: {
        class: {
            title: 'Class maker - example',
            // arguments: ['dir', 'name'],
            // input: 'path/to/template/class.js',
            // out: '{{{ dir }}}/{{{ name | Camel }}}.class.js'
        },
        module: {
            title: 'Module maker - batch example',
            // arguments: ['dir', 'name'],
            // batch: [
            //     {
            //         name: 'class',
            //         map: {
            //             dir: '{{{ dir }}}',
            //             name: '{{{ name }}}'
            //         }
            //     },
            //     {
            //         name: 'class',
            //         map: {
            //             dir: '{{{ dir }}}',
            //             name: '{{{ name }}}Module'
            //         }
            //     }
            // ]
        }
    }
}