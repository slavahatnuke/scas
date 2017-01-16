let _ = require('lodash');
let pluralize = require('pluralize');

module.exports = {
    camel: (context) => (input) => _.camelCase(input),
    Camel: (context) => (input) => _.upperFirst(_.camelCase(input)),

    kebab: (context) => (input) => _.kebabCase(input),
    Kebab: (context) => (input) => _.upperFirst(_.kebabCase(input)),

    snake: (context) => (input) => _.snakeCase(input),
    Snake: (context) => (input) => _.upperFirst(_.snakeCase(input)),

    lower: (context) => (input) => _.toLower(input),
    upper: (context) => (input) => _.toUpper(input),

    toUpper: (context) => (input) => _.toUpper(input),
    toLower: (context) => (input) => _.toLower(input),

    camelCase: (context) => (input) => _.camelCase(input),
    kebabCase: (context) => (input) => _.kebabCase(input),
    snakeCase: (context) => (input) => _.snakeCase(input),
    startCase: (context) => (input) => _.startCase(input),

    lowerCase: (context) => (input) => _.lowerCase(input),
    upperCase: (context) => (input) => _.upperCase(input),

    lowerFirst: (context) => (input) => _.lowerFirst(input),
    upperFirst: (context) => (input) => _.upperFirst(input),

    capitalize: (context) => (input) => _.capitalize(input),
    trim: (context) => (input) => _.trim(input),

    trimStart: (context) => (input) => _.trimStart(input),
    trimEnd: (context) => (input) => _.trimEnd(input),

    plural: (context) => (input) => pluralize.plural(input),
    Plural: (context) => (input) => _.upperFirst(pluralize.plural(input)),

    singular: (context) => (input) => pluralize.singular(input),
    Singular: (context) => (input) => _.upperFirst(pluralize.singular(input)),

    toArray: (context) => (text) => _.snakeCase(text).split('_'),
    toString: (context) => (array) => _.isArray(array) ? array.join('_') : '' + array,

    first: (context) => (array) => _.first(array),
    last: (context) => (array) => _.last(array),

    slice: (context) => (input, start, end) => _.slice(input, start, end),
    join: (context) => (input, separator) => _.join(input, separator || ''),
}