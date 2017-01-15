let Loader = require('../../src/config/Loader');
let Context = require('../../src/context/Context');

let assert = require('assert');

describe('config/Loader', () => {
    it('load', () => {
        let context = new Context;
        context.configPath = __dirname + '/config.scas.js';

        let loader = new Loader;
        return loader.load(context)
            .then((config) => {
                assert.deepEqual(config, {
                        "actions": {
                            "hello": {
                                "help": "help here"
                            }
                        },
                        "imports": [],
                        "description": "",
                        "help": "",

                        "pipes": {}
                    }
                )
            })
    })
})