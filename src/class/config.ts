
type TConfig = {
    inputDir: string,
    outputDir: string,
    outputFile: string,
    defaultFill: string,
    removeFill: boolean,
}

export class Config {

    private static _instance: Config;
    private _inputDir: string;
    private _outputFile: string;
    private _outputDir: string;
    private _defaultFill: string;
    private _removeFill: boolean;

    private _config: any;

    constructor(props: TConfig) {
        this._inputDir = props.inputDir ?? '';
        this._outputFile = props.outputFile ?? '';
        this._outputDir =  props.outputDir ?? '';
        this._defaultFill = props.defaultFill ?? '';
        this._removeFill = props.removeFill ?? false;

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

    get inputDir (): string {
        return this._inputDir;
    }

    get outputFile (): string {
        return this._outputFile;
    }

    get outputDir (): string {
        return this._outputDir;
    }

    get defaultFill (): string {
        return this._defaultFill;
    }

    get removeFill (): boolean {
        return this._removeFill;
    }

    set inputDir (inputDir: string) {
        this._inputDir = inputDir;
    }

    set outputFile (outputFile: string) {
        this._outputFile = outputFile;
    }

    set outputDir (outputDir: string) {
        this._outputDir = outputDir;
    }

    set defaultFill (defaultFill: string) {
        this._defaultFill = defaultFill;
    }

    set removeFill (removeFill: boolean) {
        this._removeFill = removeFill;
    }
}