"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
class Config {
    constructor(props) {
        var _a, _b, _c, _d;
        this._inputDir = (_a = props.inputDir) !== null && _a !== void 0 ? _a : './';
        this._fileName = (_b = props.fileName) !== null && _b !== void 0 ? _b : '--svg-to-json--';
        this._outputDir = (_c = props.outputDir) !== null && _c !== void 0 ? _c : '';
        this._outputType = (_d = props.outputType) !== null && _d !== void 0 ? _d : ['ts'];
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
    // input folder
    get inputDir() {
        return this._inputDir;
    }
    set inputDir(inputDir) {
        this._inputDir = inputDir;
    }
    // output file name
    get outputFile() {
        return this._fileName;
    }
    set outputFile(outputFile) {
        this._fileName = outputFile;
    }
    // output folder
    get outputDir() {
        return this._outputDir;
    }
    set outputDir(outputDir) {
        this._outputDir = outputDir;
    }
    // output file type
    get outputType() {
        return this._outputType;
    }
    set outputType(outputTypes) {
        this._outputType = outputTypes;
    }
}
exports.Config = Config;
