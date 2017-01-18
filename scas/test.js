module.exports = {
    actions: {
        call: {
            title: 'call',
            arguments: ['a', 'b', 'c'],
            call: (query) => console.log(query)
        },
        run: {
            title: 'npm i in the dir',
            arguments: ['dir'],
            call: 'cd {{{ dir }}} && pwd && npm i'
        }
    }
}