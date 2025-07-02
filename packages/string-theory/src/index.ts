export type StringInput = string | ((ctx: StringTheory) => string | void);

export default class StringTheory {
  private parts: string[] = [];

  add(input: StringInput): this {
    let value: string | void = input as any;
    if (typeof input === 'function') {
      value = input(this) ?? '';
    }
    this.parts.push((value as string) ?? '');
    return this;
  }

  render(): string {
    return this.parts.join('\n');
  }

  json(o: any = {}, spaces = 2): this {
    this.parts.push(JSON.stringify(o, null, spaces));
    return this;
  }

  n(n = 1): this {
    for (let i = 0; i < n; i++) {
      this.parts.push('');
    }
    return this;
  }

  clear(): void {
    this.parts = [];
  }

  if(condition: boolean): this {
    if (condition) return this;
    return this.mockContext() as any as this;
  }

  each(...args: any[]): this {
    let prefix = '';
    let lines: string[] = [];
    let suffix = '';
    let delimiter = '\n';
    const [a, b, c, d] = args;
    if (typeof a === 'string') {
      prefix = a || prefix;
      lines = b || lines;
      suffix = c || suffix;
      delimiter = d || delimiter;
    } else {
      lines = a || lines;
      suffix = b || suffix;
      delimiter = c || delimiter;
    }
    const result = (lines as string[]).map(line => prefix + line + suffix).join(delimiter);
    this.parts.push(result);
    return this;
  }

  private mockContext(): any {
    const self = this;
    return new Proxy({}, {
      get() {
        return () => self.mockContext();
      }
    });
  }
}
