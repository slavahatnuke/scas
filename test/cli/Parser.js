let Parser = require('../../src/cli/Parser');
let parser = new Parser;
let assert = require('assert');

describe('cli/Parser', () => {
    it('parse request', () => {
        return parser.parse([
            'hello',
            '--flag',
            '--option',
            'optValue'
        ]).then((request) => {
            assert.deepEqual(request.rawArguments, ['hello', '--flag', '--option', 'optValue'])
            assert.deepEqual(request.arguments, ['hello'])
            assert.deepEqual(request.options, {_: ['hello'], flag: true, option: 'optValue'})
        });
    })

    it('parse request with long strings', () => {
        let rawArguments = [
            'hello',
            'long text here',
            '--option',
            'some ooption value with \"string\"',
            'action-here',
            'action2-here',
            '--option2',
            'option2-here'
        ];
        return parser.parse(rawArguments).then((request) => {
            assert.deepEqual(request.rawArguments, rawArguments)
            assert.deepEqual(request.arguments, ['hello', 'long text here', 'action-here', 'action2-here'])
            assert.deepEqual(request.options, {
                    "_": [
                        "hello",
                        "long text here",
                        "action-here",
                        "action2-here",
                    ],
                    "option": "some ooption value with \"string\"",
                    "option2": "option2-here"
                }
            )
        });
    })
})