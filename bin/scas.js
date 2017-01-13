#!/usr/bin/env node

const fs = require("fs"),
    omelette = require("omelette");

// Write your CLI template.
const complete = omelette("scas <action> <user>");

complete.on("action", function() {
    this.reply(["clone", "update", "push"]);
});

complete.on("user", function(action) {
    this.reply(fs.readdirSync("/Users/"));
});

// Initialize the omelette.
complete.init();

// If you want to have a setup feature, you can use `omeletteInstance.setupShellInitFile()` function.
if (process.argv.indexOf('--setup')) {
    complete.setupShellInitFile();
}

require('../index').container.CLI.run(process.argv.slice(2));
