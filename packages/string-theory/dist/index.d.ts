export type StringInput = string | ((ctx: StringTheory) => string | void);
export default class StringTheory {
    private parts;
    add(input: StringInput): this;
    render(): string;
    json(o?: any, spaces?: number): this;
    n(n?: number): this;
    clear(): void;
    if(condition: boolean): this;
    each(...args: any[]): this;
    private mockContext;
}
