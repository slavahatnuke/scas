module.exports = class Handler {
    handle(workspace, action, request) {
        return Promise.resolve();
    }

    supports(workspace, action) {
        return false;
    }
}
