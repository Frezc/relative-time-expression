import { Token, Expression, Offset, Period, Unit } from "./interface";
import { createError } from "./error";

export interface ParserOptions {
  customPeriod?: boolean;
}

export default class Parser {
  static parse(tokens: Token[], options?: ParserOptions) {
    return new Parser(tokens, options).parse();
  }

  private iter: number = 0;

  constructor(private readonly tokens: Token[], private readonly options: ParserOptions = {}) {}

  get pop() {
    return this.tokens[this.iter++];
  }

  get top() {
    return this.tokens[this.iter];
  }

  parse(): Expression {
    this.parseWs();
    this.parseNow();
    this.parseWs();
    const manipulations: Array<Offset | Period> = [];
    while(this.iter < this.tokens.length) {
      manipulations.push(this.parseManipulation());
      this.parseWs();
    }
    return {
      type: 'Expression',
      body: manipulations,
      start: 0,
      end: this.tokens.length > 0 ? this.tokens[this.tokens.length - 1].end : 0,
    };
  }

  parseWs() {
    if (this.top && this.top.type === 'ws') {
      return this.pop;
    }
  }

  parseNow() {
    const token = this.top;
    if (token && token.type === 'keyword' && token.raw.toLowerCase() === 'now') {
      return this.pop;
    }
  }

  parseManipulation() {
    const token = this.top;
    if (token.type === 'op') {
      if (token.raw === '+' || token.raw === '-') {
        return this.parseOffset();
      } else if (token.raw === '/' || token.raw === '\\') {
        return this.parsePeriod();
      }
    }
    return this.unexpect('operator(+, -, /, \\)', token);
  }

  parseOffset(): Offset {
    const start = this.top.start;
    const op = this.pop.raw as '+' | '-';
    this.parseWs();
    if (!this.top) {
      return this.unexpect('integer or unit(e.g. s, m, h, d, ...)');
    }
    let number = 1;
    if (this.top.type === 'number') {
      number = parseInt(this.pop.raw, 10);
    }
    this.parseWs();
    const unitToken = this.parseUnit();
    return {
      type: 'Offset',
      op,
      number,
      unit: unitToken.raw as Unit,
      start,
      end: unitToken.end,
    };
  }

  parsePeriod(): Period {
    const start = this.top.start;
    const op = this.pop.raw as '/' | '\\';
    this.parseWs();
    let number = 1;
    if (this.options.customPeriod && this.top.type === 'number') {
      number = parseInt(this.pop.raw, 10);
    }
    this.parseWs();

    const unitToken = this.parseUnit();
    return {
      type: 'Period',
      op,
      number,
      unit: unitToken.raw as Unit,
      start,
      end: unitToken.end,
    };
  }

  parseUnit(): Token {
    if (this.top && this.top.type === 'unit') {
      return this.pop;
    }

    return this.unexpect('unit(e.g. s, m, h, d, ...)', this.top);
  }

  unexpect(required: string, found?: Token): never {
    if (found) {
      throw createError({
        expect: required,
        actual: found.raw,
        start: found.start,
        end: found.end,
      });
    } else {
      throw createError({
        expect: required,
      });
    }
  }
}