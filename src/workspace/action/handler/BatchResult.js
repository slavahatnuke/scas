module.exports = class BatchResult {
    constructor(results) {
        this.results = results || [];
    }

    getResults() {
        return Promise.resolve()
            .then(() => this.results);
    }
}
