# scas
Scaffolding console. It generates what you want by your templates.

## Setup
  
```bash
npm install --global scas
```

### Setup completion (auto complete)

#### Setup this automatically.
```bash
scas --completion-install
```
And restart your terminal.

If automatically setup does not work please follow steps bellow.

#### Setup manually 

Make completion file.
```bash
scas --completion > your/cutom/path/scas.completion.sh
```

Add this to your bash profile. It depends on platform (OSX, Ubuntu, Linux, etc..)
```bash
## ~/.profile or ~/.bash_profile or ~/.bashrc
source your/cutom/path/scas.completion.sh
```

And restart your terminal.

## How to use

### Get help
 
```bash
scas
```
It will show available commands.

### Init .scas.js file

```bash
scas init
```
It will generate `.scas.js` file with instructions.

### Make your template

Create file `template/class.js` with class implementation.
Its free form template with ```{{{ placeholder }}} ``` or ```{{{ placeholder | pipe }}} ```

```javascript
module.exports = class {{{ name | Camel }}} {

    constructor( {{{ name | camel }}} ) {
        this.{{{ name | camel }}} = {{{ name | camel }}};
    }
    
    // ...    
}
```

### Make your action
Open `.scas.js` and replace or update `actions` section.

```javascript

    // ....
    
    actions: {
        class: {
            title: 'Generate class - its your action', // free form title for help
            arguments: ['dir', 'name'], // required arguments
            input: 'template/class.js', // path to template
            out: '{{{ dir }}}/{{{ name | Camel }}}.class.js' // path to generated file
        }
    }
    
    // ....
```

### Generate your code

```bash
scas
```
It should contains your action.
```bash
$ scas [actions] <arguments> <options>
  Scaffolding console

    class                        Generate class - its your action
....
```

#### Lets make your class

**Use [TAB] it helps a lot**
```bash
scas class dir tmp/example name user
```

It should generate class to local `tmp/example` folder.

```bash
cat tmp/example/User.class.js
```

```javascript
module.exports = class User {

    constructor( user ) {
        this.user = user;
    }

    // ...
}
```
So thats it.

### Multiple actions (batch)
Ok, you have one class but you want to generate module with multiple files.

Lets make batch action in `.scas.js` file.

Add to actions
```javascript
        // ...
        module: {
            'title': 'Generate module', // your help line
            arguments: ['dir', 'name'], // required arguments
            batch: [
                'class', // #1 re-used: class action with same arguments - simply, generates class file. 
                { 
                    name: 'class', // #2 re-used class action with mapped arguments, generates module class file.
                    map: {
                        dir: '{{{ dir }}}', 
                        name: '{{{ name }}}Module'
                    }
                }
            ]
        }
```

Now actions section looks like:
```javascript
    actions: {
        class: {
            title: 'Generate class - its your action', // free form title for help
            arguments: ['dir', 'name'], // required arguments
            input: 'template/class.js', // path to template
            out: '{{{ dir }}}/{{{ name | Camel }}}.class.js' // path to generated file
        },
        module: {
            'title': 'Generate module', // your help line
            arguments: ['dir', 'name'], // required arguments
            batch: [
                'class',
                {
                    name: 'class',
                    map: {
                        dir: '{{{ dir }}}',
                        name: '{{{ name }}}Module'
                    }
                }
            ]
        }
    }
```

#### Run your batch action.

```bash
scas
```
It will show your actions.

```bash
$ scas [actions] <arguments> <options>
  Scaffolding console

    class                        Generate class - its your action
    module                       Generate module
...
```

Lets generate your module.

```bash
scas module dir tmp/example name auth
```
Your will see output like this.
```bash
scas module dir tmp/example name auth
class                    
    input                        template/class.js
    out                          tmp/example/Auth.class.js
    content                      module.exports = class Auth { constructor( auth ) { this.aut...
class                    
    input                        template/class.js
    out                          tmp/example/AuthModule.class.js
    content                      module.exports = class AuthModule { constructor( authModule ...
```

## API
`.scas.js` has easy structure. It contains next fields.
 
 - `title` - text presentation
 - `description` - text overview
 - `actions` - actions set
 - `imports` - array of imports with pathes to other `.scas.js`
 - `pipes` - custom set of functions to modify your arguments `{{{ name | myCustomPipe }}}`
 
 Now `.scas.js` looks like:
 
```javascript
module.exports = {
    title: '$ scas [actions] <arguments> <options>', // you can rewrite this for you goals
    description: 'Scaffolding console', // you can rewrite this for you goals
    
    // import other scas files or packages.
    imports: [
        // it needs to support default help
        { path: 'scas/.scas' }
    ],
    actions: {
        class: {
            title: 'Generate class - its your action', // free form title for help
            description: 'Some hint', // you can rewrite this for you goals
            help: 'More info about your action', // you can rewrite this for you goals            
            arguments: ['dir', 'name'], // required arguments
            input: 'template/class.js', // path to template
            out: '{{{ dir }}}/{{{ name | Camel }}}.class.js' // path to generated file
        },
        module: {
            'title': 'Generate module', // your help line
            arguments: ['dir', 'name'], // required arguments
            batch: [
                'class',
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
    pipes: {
        myCustomPipe: (context) => (input) => 'my-pipe-changes' + input
    }

}
```
##### presentation fields
`title` and `description` are fields to present info about your scaffolding.

##### actions

Simple action
```javascript
    actions: {
        myActionName: {
            title: 'Generate class - its your action', // free form title for help
            description: 'Some hint', // you can rewrite this for you goals, is not required
            help: 'More info about your action', // you can rewrite this for you goals, is not required            
            arguments: ['myDir', 'className'], // required arguments, is not required
            input: 'template/class.js', // path to template, required
            out: '{{{ myDir }}}/{{{ className | Camel }}}.class.js' // path to generated file, required
        }
   }        
```

Batch action
```javascript
        // action section here ...
        myModuleName: {
            'title': 'Generate my module', // your help line
            arguments: ['moduleDir', 'moduleName'], // required arguments
            
            batch: [
                'myActionName', 
                'myOtherAction',
                {
                    // my custom action
                    name: 'myAction',

                    // myAction action requires arguments dir and name, just remap this.
                    map: {
                        dir: '{{{ moduleDir }}}',
                        name: '{{{ moduleName }}}Module'
                    }
                }
            ]
        }
```

##### imports
Imports section loads any other actions from any file like `.scas.js` or from any `*.js` or npm packages.

Now it loads only default help and init form `scas` npm package.
```javascript
    imports: [
        // it needs to support default help
        { path: 'scas/.scas' }
    ]
```

Lets add yours. Make your own
`template/myRules.js`

```javascript 
module.exports = {
    title: 'extended action',

    actions: {
        component: {
            title: 'Angular component',
            arguments: ['dir', 'name'],
            input: 'ngComponent.ts',
            out: '{{{ dir }}}/{{{ name | kebab }}}.component.ts'
        }
    }
}
```

It requires: `ngComponent.ts`
Lets make it. `template/ngComponent.ts`

```typescript
import {Component} from "@angular/core";

@Component({
    selector: '{{{ name | kebab }}}',
    template: `Hi {{{ name }}}`
})
export class {{{ name | Camel }}}Component {
    constructor() {

    }
}
```

Lets import this to main `.scas.js`

```javascript
    imports: [
        { path: 'scas/.scas' },
        { path: 'template/myRules', as: 'angular' }
    ]
```

Run this
```bash
scas angular component dir tmp/ng name userDetails
```

Output
```bash
component                
    input                        ngComponent.ts
    out                          tmp/ng/user-details.component.ts
    content                      import {Component} from "@angular/core"; @Component({ select...
```

Result
```bash
cat tmp/ng/user-details.component.ts
import {Component} from "@angular/core";

@Component({
    selector: 'user-details',
    template: `Hi userDetails`
})
export class UserDetailsComponent {
    constructor() {

    }
}
```

You can import same rule to main namespace.
```javascript
    imports: [
        { path: 'scas/.scas' },
        { path: 'template/myRules' }
    ]
```

It will be same:
```bash
scas component dir tmp/ng name userDetails
component                
    input                        ngComponent.ts
    out                          tmp/ng/user-details.component.ts
    content                      import {Component} from "@angular/core"; @Component({ select...
```

##### pipes
Pipes its awesome :)

Available pipes by default:
```javascript
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
```

Or you can make your custom pipes and declare in the pipe section.

```javascript
    pipes: {
        myCustomPipe: (context) => (input) => 'my-pipe-changes' + input
    }
```


Have a fun [+1G Team](http://plus1generation.com/)

