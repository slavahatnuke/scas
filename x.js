
let declaration = new Declaration({
    imports: (data) => new Imports(context, data),
    pipes: (data) => new Pipes(context, data),
    actions: (data) => new Actions(context, data)
});

declaration.load(config).then((result) => {
    result.imports
});

let result = declaration.load(config);

