"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
class Config {
    constructor(props) {
        var _a, _b, _c, _d, _e;
        this._inputDir = (_a = props.inputDir) !== null && _a !== void 0 ? _a : '';
        this._outputFile = (_b = props.outputFile) !== null && _b !== void 0 ? _b : '';
        this._outputDir = (_c = props.outputDir) !== null && _c !== void 0 ? _c : '';
        this._defaultFill = (_d = props.defaultFill) !== null && _d !== void 0 ? _d : '';
        this._removeFill = (_e = props.removeFill) !== null && _e !== void 0 ? _e : false;
    }
    static iniConfig(props) {
        if (!this._instance) {
            this._instance = new Config(props);
        }
    }
    static get instance() {
        if (!this._instance) {
            throw new Error('Config is not initialized');
        }
        return this._instance;
    }
    get inputDir() {
        return this._inputDir;
    }
    get outputFile() {
        return this._outputFile;
    }
    get outputDir() {
        return this._outputDir;
    }
    get defaultFill() {
        return this._defaultFill;
    }
    get removeFill() {
        return this._removeFill;
    }
    set inputDir(inputDir) {
        this._inputDir = inputDir;
    }
    set outputFile(outputFile) {
        this._outputFile = outputFile;
    }
    set outputDir(outputDir) {
        this._outputDir = outputDir;
    }
    set defaultFill(defaultFill) {
        this._defaultFill = defaultFill;
    }
    set removeFill(removeFill) {
        this._removeFill = removeFill;
    }
}
exports.Config = Config;
