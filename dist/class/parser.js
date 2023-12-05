"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const svg_parser_1 = require("svg-parser");
const svgo_1 = require("svgo");
const dirs_1 = require("./dirs");
const strings_1 = require("./strings");
class Parser {
    constructor(defaultFill = undefined) {
        this._notUsed = [];
        this._parsed = [];
        this.defaultFill = defaultFill;
    }
    parse({ path, file }) {
        // We have to set svgName before we call getSvg
        this.svgFileName = file;
        //if file type is not svg
        if (this.svgFileName === undefined) {
            this.notParsedLog = { file, name: '---' };
            return null;
        }
        const camelize = strings_1.Strings.camelize(this.svgFileName);
        const result = {
            viewBox: '',
            fill: '',
            paths: [],
        };
        const parsedSvg = this.getSvg(path);
        parsedSvg.children.forEach((item) => {
            var _a, _b, _c, _d;
            const children = item;
            result.viewBox = (_b = (_a = children.properties) === null || _a === void 0 ? void 0 : _a.viewBox.toString()) !== null && _b !== void 0 ? _b : '';
            result.fill = (_d = (_c = children.properties) === null || _c === void 0 ? void 0 : _c.fill) !== null && _d !== void 0 ? _d : undefined;
            children.children.forEach((child) => {
                const paths = this.parseChild(child, file);
                result.paths.push(...paths);
            });
        });
        // if result dont have any paths
        if (result.paths.length === 0) {
            this.notParsedLog = { file, name: camelize };
            return null;
        }
        else {
            // if svg have parseable paths
            this.parsedLog = { file, name: camelize };
            return result;
        }
    }
    getSvg(fullName) {
        const content = dirs_1.Dirs.getFileContent(fullName);
        const result = (0, svgo_1.optimize)(content, {
            plugins: ['mergePaths'],
        });
        return (0, svg_parser_1.parse)(result.data);
    }
    parseChild(child, fileName) {
        var _a;
        const item = {};
        const result = [];
        if (child.children !== undefined && Object.keys(child.children).length > 0) {
            child.children.forEach((child) => {
                result.push(...this.parseChild(child, fileName));
            });
        }
        if ((_a = child.properties) === null || _a === void 0 ? void 0 : _a.d) {
            for (const [key, value] of Object.entries(child.properties)) {
                if (key !== 'style') {
                    let val = value;
                    item[strings_1.Strings.camelize(key)] = val;
                }
            }
            result.push(item);
        }
        return result;
    }
    ;
    // SETTERS
    set notParsedLog(log) {
        this._notUsed.push(log);
    }
    set parsedLog(log) {
        this._parsed.push(log);
    }
    set svgFileName(file) {
        const reg = new RegExp(/\.svg$/);
        const name = file.replace(reg, '');
        if (name === file) {
            this._svgFileName = undefined;
            return;
        }
        this._svgFileName = name;
    }
    // GETTERS
    get notParsedLog() {
        return this._notUsed;
    }
    get parsedLog() {
        return this._parsed;
    }
    get svgFileName() {
        return this._svgFileName;
    }
}
exports.Parser = Parser;
