module.exports = {
    actions: {
        call: {
            title: 'call',
            arguments: ['a', 'b', 'c'],
            call: (query) => console.log(query)
        }
    }
}