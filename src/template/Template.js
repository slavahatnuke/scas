let Twig = require('twig');

module.exports = class Template {
    constructor(template) {
        this.replaces = [

            // {% for ... %}

            // {
            //     from: '{{%',
            //     to: '<<<%'
            // },
            // {
            //     from: '%}}',
            //     to: '%>>>'
            // }
            // ,
            // {
            //     from: '{%',
            //     to: '<!%',
            //     normalize: true
            // },
            // {
            //     from: '%}',
            //     to: '%!>',
            //     normalize: true
            // },
            // {
            //     from: '<<<%',
            //     to: '{%'
            // },
            // {
            //     from: '%>>>',
            //     to: '%}'
            // },
            //
            // {{ value }}
            {
                from: '{{{',
                to: '<<<!'
            },
            {
                from: '}}}',
                to: '!>>>'
            },
            {
                from: '{{',
                to: '<!!',
                normalize: true
            },
            {
                from: '}}',
                to: '!!>',
                normalize: true
            },
            {
                from: '<<<!',
                to: '{{'
            },
            {
                from: '!>>>',
                to: '}}'
            }
        ];

        this.template = this.prepare('' + template)
    }

    prepare(template) {
        this.replaces.map((replacement) => {
            template = template.replace(replacement.from, replacement.to, 'igm')
        });
        return template;
    }

    normalize(value) {
        this.replaces
            .filter((replacement) => replacement.normalize)
            .map((replacement) => {
                value = value.replace(replacement.to, replacement.from, 'igm')
            });
        return value;
    }

    render(data) {
        console.log('this.template', this.template);

        return Promise.resolve()
            .then(() => {
                let template = Twig.twig({data: this.template});
                return this.normalize(template.render(data));
            });
    }
}
