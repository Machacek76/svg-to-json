#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_1 = require("./class");
const _svg_to_json_json_1 = __importDefault(require("./../.svg-to-json.json"));
const [, , ...args] = process.argv;
const verbose = !!args.find((arg) => arg === '-v' || arg === '--verbose');
class_1.Config.iniConfig(_svg_to_json_json_1.default.props);
const cnf = class_1.Config.instance;
const files = class_1.Dirs.getFiles(cnf.inputDir);
const parser = new class_1.Parser(_svg_to_json_json_1.default.props.defaultFill);
const result = {};
for (const file of files) {
    const path = parser.parse(file);
    if (path) {
        const [name] = Object.keys(path);
        result[name] = path;
    }
}
const fileTemplate = (iconsPath) => `export const iconsPaths = ${JSON.stringify(iconsPath)}`;
class_1.Dirs.saveFile(_svg_to_json_json_1.default.props.outputFile, fileTemplate(result));
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
