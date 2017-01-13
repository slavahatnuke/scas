module.exports = {
    imports: [
        {
            path: '/path/to/angular2/.scas.js',
            as: 'ng-'
        }
    ],
    actions: {
        component: {
            description: 'short description here',
            help: 'long description here or move this to file',

            arguments: ['name', 'dir'],
            options: ['require'],

            input: 'path/to/component.js',
            output: '{{{dir}}}/{{{name}}}.component.js',
            call: (context) => Promise.resolve().then(() => console.log('custom logic here'))
        },
        module: {
            description: 'short description here',
            help: 'long description here or move this to file',

            arguments: ['name', 'dir'],
            options: ['require'],

            input: 'path/to/component.js',
            output: '{{{dir}}}/{{{name}}}.component.js'
        },
        bundle: {
            arguments: ['name', 'dir', 'moduleName'],
            batch: [
                'component', {
                    action: 'module',
                    map: {
                        name: 'moduleName'
                    }
                },
                'ng-resolver',
                'ng-can-activate'
            ]
        }
    },
    pipes: {
        camelCase: (context) => (input) => 'camelCaseValueNeedToBeReturned'
    }
};