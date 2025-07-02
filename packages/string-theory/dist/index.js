"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StringTheory {
    constructor() {
        this.parts = [];
    }
    add(input) {
        let value = input;
        if (typeof input === 'function') {
            value = input(this) ?? '';
        }
        this.parts.push(value ?? '');
        return this;
    }
    render() {
        return this.parts.join('\n');
    }
    json(o = {}, spaces = 2) {
        this.parts.push(JSON.stringify(o, null, spaces));
        return this;
    }
    n(n = 1) {
        for (let i = 0; i < n; i++) {
            this.parts.push('');
        }
        return this;
    }
    clear() {
        this.parts = [];
    }
    if(condition) {
        if (condition)
            return this;
        return this.mockContext();
    }
    each(...args) {
        let prefix = '';
        let lines = [];
        let suffix = '';
        let delimiter = '\n';
        const [a, b, c, d] = args;
        if (typeof a === 'string') {
            prefix = a || prefix;
            lines = b || lines;
            suffix = c || suffix;
            delimiter = d || delimiter;
        }
        else {
            lines = a || lines;
            suffix = b || suffix;
            delimiter = c || delimiter;
        }
        const result = lines.map(line => prefix + line + suffix).join(delimiter);
        this.parts.push(result);
        return this;
    }
    mockContext() {
        const self = this;
        return new Proxy({}, {
            get() {
                return () => self.mockContext();
            }
        });
    }
}
exports.default = StringTheory;
