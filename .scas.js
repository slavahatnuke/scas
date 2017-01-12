module.exports = {
    imports: [
        {
            path: '/path/to/angular2/.scas.js',
            as: 'ng-'
        }
    ],

    commands: {
        component: {
            input: ['name', 'dir'],
            source: 'path/to/component.js',
            interpolate: ['[[', ']]'],
            output: '[[dir]]/[[name]].component.js'
        },
        module: {
            input: ['name', 'dir'],
            source: 'path/to/module.js',
            output: '{{dir}}/{{name}}.module.js'
        },
        bundle: {
            input: ['name', 'dir', 'moduleName'],
            includes: [
                'component', {
                    command: 'module',
                    map: {
                        name: 'moduleName'
                    },
                    input: []
                },
                'ng-resolver',
                'ng-can-activate'
            ]
        }
    }
};