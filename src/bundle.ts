import {Dirs, Parser, Config} from './class';
import settings from './../.svg-to-json.json';

const [, , ...args] = process.argv;

const verbose = !!args.find((arg) => arg === '-v' || arg === '--verbose');


Config.iniConfig(settings.props);
const cnf = Config.instance;

const files = Dirs.getFiles(cnf.inputDir);

const parser = new Parser(settings.props.defaultFill);

const result:any = {};

for(const file of files) {
    const path = parser.parse(file);
    if(path) {
        const [name] = Object.keys(path);
       result[name] = path;
    }
}

const fileTemplate = (iconsPath: any) =>
  `export const iconsPaths = ${JSON.stringify(iconsPath)}`;

Dirs.saveFile(settings.props.outputFile, fileTemplate(result));

if(verbose) {
    console.log('Files:')
    console.table(files);
    console.table(`Parsed ${parser.parsedLog.length} files`);
    console.table(parser.parsedLog);
    console.table(`Not parsed ${parser.notParsedLog.length} files`);
    console.table(parser.notParsedLog);
} else {
    console.table(`Parsed ${parser.parsedLog.length} files`);
    console.table(`Not parsed ${parser.notParsedLog.length} files`);    
}