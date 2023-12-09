"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_1 = require("./class");
const fs = require('fs');
let settings = fs.readdirSync(process.cwd()).find((file) => file === '.svg-to-json.json');
console.log('>>>', process.cwd());
if (!settings) {
    console.error('No settings file found');
    process.exit(1);
}
settings = class_1.Dirs.getFileContent(settings);
settings = JSON.parse(settings);
const [, , ...args] = process.argv;
const verbose = !!args.find((arg) => arg === '-v' || arg === '--verbose');
class_1.Config.iniConfig(settings.props);
const cnf = class_1.Config.instance;
const files = class_1.Dirs.getFiles(cnf.inputDir);
const parser = new class_1.Parser();
const result = {};
for (const file of files) {
    const path = parser.parse(file);
    if (path) {
        const { name } = path;
        result[name] = path;
    }
}
const fileTypes = cnf.outputType;
for (const type of fileTypes) {
    let fileContent = '';
    switch (type) {
        case 'ts':
            fileContent = class_1.Templates.tsTemplate(result);
            break;
        case 'js':
            fileContent = class_1.Templates.jsTemplate(result);
            break;
        case 'json':
            fileContent = class_1.Templates.jsonTemplate(result);
            break;
    }
    console.log(`./${cnf.outputDir}/${cnf.outputFile}.${type}`);
    class_1.Dirs.saveFile(`./${cnf.outputDir}/${cnf.outputFile}.${type}`, fileContent);
}
if (verbose) {
    console.log('Files:');
    console.table(files);
    console.table(`Parsed ${parser.parsedLog.length} files`);
    console.table(parser.parsedLog);
    console.table(`Not parsed ${parser.notParsedLog.length} files`);
    console.table(parser.notParsedLog);
}
else {
    console.table(`Parsed ${parser.parsedLog.length} files`);
    console.table(`Not parsed ${parser.notParsedLog.length} files`);
}
