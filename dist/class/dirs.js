"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dirs = void 0;
const fs = require('fs');
class Dirs {
    static getFiles(dir, files_ = []) {
        files_ = files_ || [];
        const files = fs.readdirSync(dir);
        for (const i in files) {
            const file = files[i];
            const path = `${dir}/${file}`;
            if (fs.statSync(path).isDirectory()) {
                this.getFiles(path, files_);
            }
            else {
                files_.push({
                    file,
                    path,
                });
            }
        }
        return files_;
    }
    static getFileContent(file) {
        return fs.readFileSync(file, 'utf8').toString();
    }
    static saveFile(file, content) {
        return fs.writeFileSync(file, content);
    }
}
exports.Dirs = Dirs;
