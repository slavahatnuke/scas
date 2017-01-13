let Twig = require('twig');

module.exports = class Template {
    constructor(template) {
        this.init();
        this.template = this.prepare('' + template)
    }

    init() {
        this.replaces = [

            // {% for ... %}

            {
                from: '{{%',
                to: '<<<%'
            },
            {
                from: '%}}',
                to: '%>>>'
            }
            ,
            {
                from: '{%',
                to: '<!%',
                normalize: true
            },
            {
                from: '%}',
                to: '%!>',
                normalize: true
            },
            {
                from: '<<<%',
                to: '{%'
            },
            {
                from: '%>>>',
                to: '%}'
            },

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

        this.replaces = this.replaces.map((replacement) => {
            let reFrom = replacement.from.split('').map((i) => '\\' + i).join('');
            let reTo = replacement.to.split('').map((i) => '\\' + i).join('');

            replacement.fromRegExp = new RegExp(reFrom, 'igm');
            replacement.toRegExp = new RegExp(reTo, 'igm');

            return replacement;
        });
    }

    prepare(template) {
        this.replaces.map((replacement) => {
            template = template.replace(replacement.fromRegExp, replacement.to)
        });
        return template;
    }

    normalize(value) {
        this.replaces
            .filter((replacement) => replacement.normalize)
            .map((replacement) => {
                value = value.replace(replacement.toRegExp, replacement.from)
            });
        return value;
    }

    render(data) {
        return Promise.resolve()
            .then(() => {
                let template = Twig.twig({data: this.template});
                return this.normalize(template.render(data));
            });
    }
}
