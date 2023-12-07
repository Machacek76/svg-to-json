
import {ElementNode, RootNode, parse as svgParser} from 'svg-parser';
import {optimize as svgoOptimize} from 'svgo';
import {Dirs} from './dirs';
import {Strings} from './strings';

export type TFile = {
    path: string,
    file: string,
};

type TResult = {
    name: string,
    viewBox: string,
    fill: string | undefined | number,
    paths: [],
};

type TLog = {
    file: string,
    name: string,
};

class Parser {

    private _notUsed: TLog[];
    private _parsed: TLog[];
    private _svgFileName: string | undefined;

    constructor() {
        this._notUsed = [];
        this._parsed = [];
    }

    public parse ({path, file}: TFile): TResult | null {

        // We have to set svgName before we call getSvg
        this.svgFileName = file;

        //if file type is not svg
        if(this.svgFileName === undefined) {
            this.notParsedLog = {file, name: '---'};
            return null;
        }

        const camelize = Strings.camelize(this.svgFileName);
        const result: TResult = {
            name: camelize,
            viewBox: '',
            fill: '',
            paths: [],
        };

        const parsedSvg = this.getSvg(path);

        parsedSvg.children.forEach((item) => {

            const children = item  as ElementNode;
            result.viewBox = children.properties?.viewBox.toString() ?? '';
            result.fill = children.properties?.fill ?? undefined;

            children.children.forEach((child) => {
                const paths = this.parseChild(child, file);

                result.paths.push(...paths);
            })
        });

        // if result dont have any paths
        if(result.paths.length === 0) {
            this.notParsedLog = {file, name: camelize};
            
            return null
        } else {
            // if svg have parseable paths
            this.parsedLog = {file, name: camelize};

            return result;
        }
    }

    private getSvg (fullName: string): RootNode {
        const content = Dirs.getFileContent(fullName);

        const result = svgoOptimize(content, {
            plugins: ['mergePaths'],
        });
        
        return svgParser(result.data);
    }

    private parseChild (child : any, fileName:string):[] {
        
        const item: any = {};
        const result: any = [];  
        
        if( child.children !== undefined && Object.keys(child.children).length > 0) {
            child.children.forEach((child: any) => {
                result.push(...this.parseChild(child, fileName));
            });
        }

        if(child.properties?.d) {
            
            for(const [key, value] of Object.entries(child.properties)) {
                if(key !== 'style') {
                    let val = value;
                    item[Strings.camelize(key)] = val;
                }
            }

            result.push(item);
        }

        return result;
    };

    // SETTERS
    set notParsedLog (log: TLog) {
        this._notUsed.push(log);
    }

    set parsedLog (log: TLog) {
        this._parsed.push(log);
    }

    set svgFileName (file: string) {
        const reg = new RegExp(/\.svg$/);
        const name = file.replace(reg, '');

        if(name === file) {
            this._svgFileName = undefined;
            return;
        }

        this._svgFileName = name;
    }

    // GETTERS
    get notParsedLog (): TLog[] {
        return this._notUsed;
    }

    get parsedLog (): TLog[] {
        return this._parsed;
    }

    get svgFileName (): string | undefined {
        return this._svgFileName;
    }
}

export {Parser};