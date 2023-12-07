"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Templates = void 0;
class Templates {
    static jsonTemplate(iconsPath) {
        return JSON.stringify(iconsPath);
    }
    static tsTemplate(iconsPath) {
        return `export const iconsPaths = ${JSON.stringify(iconsPath)}`;
    }
    static jsTemplate(iconsPath) {
        return `export const iconsPaths = ${JSON.stringify(iconsPath)}`;
    }
}
exports.Templates = Templates;
