const fs = require('fs');
import {Strings} from './strings';

export type TFile = {
    path: string,
    file: string,
};

class Dirs {

    static getFiles (dir: string, files_: TFile[] = []) {

        files_ = files_ || [];
        const files = fs.readdirSync(dir);

        for(const i in files) {
            const file = files[i];
            const path = `${dir}/${file}`;
            
            if(fs.statSync(path).isDirectory()) {
                this.getFiles(path, files_);
            } else {

                files_.push({
                    file,
                    path,
                });
            }
        }
        return files_;
    }

    public static getFileContent (file: string): string {
        return fs.readFileSync(file, 'utf8').toString();
    }

    public static saveFile (file: string, content: string): void {
        return fs.writeFileSync(file, content);
    }
}


export {Dirs};