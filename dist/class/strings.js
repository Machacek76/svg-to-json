"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Strings = void 0;
class Strings {
    static camelize(text) {
        const a = text
            .toLowerCase()
            .replace(/[-_\s.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
        return a.substring(0, 1).toLowerCase() + a.substring(1);
    }
}
exports.Strings = Strings;
