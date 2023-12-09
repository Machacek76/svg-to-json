import {Dirs, Parser, Config, Templates} from './class';
const fs = require('fs');

const root = process.cwd();
let settings = fs.readdirSync(root).find((file: string) => file === '.svg-to-json.json');

if(!settings) {
    console.error('No settings file found');
    process.exit(1);
}

settings = Dirs.getFileContent(settings);
settings = JSON.parse(settings);

settings.props.inputDir = `${root}/${settings.props.inputDir}`;
settings.props.outputDir = `${root}/${settings.props.outputDir}`;

const [, , ...args] = process.argv;
const verbose = !!args.find((arg) => arg === '-v' || arg === '--verbose');

Config.iniConfig(settings.props);
const cnf = Config.instance;
const files = Dirs.getFiles(cnf.inputDir);
const parser = new Parser();
const result:any = {};

for(const file of files) {
    const path = parser.parse(file);
    if(path) {
        const {name} = path;
        result[name] = path;
    }
}

const fileTypes = cnf.outputType;

for(const type of fileTypes) {
    let fileContent = '';
    
    switch(type) {
        case 'ts':
            fileContent = Templates.tsTemplate(result);
            break;
        case 'js':
            fileContent = Templates.jsTemplate(result);
            break;
        case 'json':
            fileContent = Templates.jsonTemplate(result);
            break;
    }

    console.log(`./${cnf.outputDir}/${cnf.outputFile}.${type}`);
    Dirs.saveFile(`./${cnf.outputDir}/${cnf.outputFile}.${type}`, fileContent);
}

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