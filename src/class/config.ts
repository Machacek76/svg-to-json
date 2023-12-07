
type TConfig = {
    inputDir: string,
    outputDir: string,
    fileName: string,
    defaultFill: string,
    outputType: ['ts' | 'js' | 'json']
}

export class Config {

    private static _instance: Config;
    private _inputDir: string;
    private _fileName: string;
    private _outputDir: string;
    private _outputType: ['ts' | 'js' | 'json' ];

    constructor(props: TConfig) {
        this._inputDir = props.inputDir ?? './';
        this._fileName = props.fileName ?? '--svg-to-json--';
        this._outputDir =  props.outputDir ?? '';
        this._outputType = props.outputType ?? ['ts'];
    }

    public static iniConfig (props: TConfig) {
        if(!this._instance) {
            this._instance = new Config(props);
        }
    }

    static get instance(): Config {
        if(!this._instance) {
            throw new Error('Config is not initialized');
        }
        return this._instance;
    }

    // input folder
    get inputDir (): string {
        return this._inputDir;
    }

    set inputDir (inputDir: string) {
        this._inputDir = inputDir;
    }

    // output file name
    get outputFile (): string {
        return this._fileName;
    }

    set outputFile (outputFile: string) {
        this._fileName = outputFile;
    }

    // output folder
    get outputDir (): string {
        return this._outputDir;
    }

    set outputDir (outputDir: string) {
        this._outputDir = outputDir;
    }

    // output file type
    get outputType (): ['ts' | 'js' | 'json'] {
        return this._outputType;
    }

    set outputType (outputTypes: ['ts' | 'js' | 'json']) {
        this._outputType = outputTypes;
    }
}
