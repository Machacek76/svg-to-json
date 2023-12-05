"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const svg_parser_1 = require("svg-parser");
const svgo_1 = require("svgo");
const dirs_1 = require("./dirs");
class Parser {
    constructor(defaultFill = 'currentColor') {
        this.notUsed = {};
        this.parsed = {};
        this.defaultFill = defaultFill;
        console.log('Parser constructor');
    }
    parse({ fullName, file, name, camelize }) {
        const parsed = this.getSvg(fullName);
        console.log(parsed);
    }
    getSvg(fullName) {
        const content = dirs_1.Dirs.getFileContent(fullName);
        const result = (0, svgo_1.optimize)(content, {
            plugins: ['mergePaths'],
        });
        return (0, svg_parser_1.parse)(result.data);
    }
}
