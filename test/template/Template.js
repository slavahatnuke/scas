let Template = require('../../src/template/Template');
let assert = require('assert');

describe('template/Template.js', () => {
    it('render {{{ name }}}', () => {
        let template = new Template('Hello {{{ name }}} {{must be left}}');

        return template
            .render({name: 'slava'})
            .then((result) => {
                assert.equal(result, 'Hello slava {{must be left}}')
            });
    })

    it('render {{% for ... %}}', () => {
        let template = new Template('{{% for value in list %}} {{{ value }}}, {{% endfor %}} {% must be left %}');

        return template
            .render({list: ['a', 'b', 'c']})
            .then((result) => {
                assert.equal(result, ' a,  b,  c,  {% must be left %}')
            });
    })
})