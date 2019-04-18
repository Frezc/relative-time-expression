import { Token, TokenType } from "./interface";

const wsRegexp = /^\s+/;
const unitRegexp = /^[smhdwMy]/;
const intRegexp = /^[0-9]+/;
const opRegexp = /^[+-/\\]/;
const nowRegexp = /now/i;

export default class Tokenizer {
  static parse(exp: string) {
    return new Tokenizer(exp).parse();
  }

  private tokens: Token[] = [];
  private iter: number = 0;

  constructor(private readonly raw: string) {}

  parse() {
    while(this.iter < this.raw.length) {
      this.tokens.push(this.nextToken());
    }
    return this.tokens;
  }

  nextToken() {
    const nextChar = this.raw.charAt(this.iter);
    if (wsRegexp.test(nextChar)) {
      return this.readWs();
    } else if (unitRegexp.test(nextChar)) {
      return this.readUnit();
    } else if (intRegexp.test(nextChar)) {
      return this.readInt();
    } else if (opRegexp.test(nextChar)) {
      return this.readOp();
    } else if (nowRegexp.test(this.raw.slice(this.iter, this.iter + 3))) {
      return this.readNow();
    }

    throw new Error(`unknown token '${nextChar}' at (${this.iter}, ${this.iter + 1})`);
  }

  readNow(): Token {
    return this.readSize('keyword', 3);
  }

  readWs(): Token {
    return this.readWhile('ws', (c) => wsRegexp.test(c));
  }

  readUnit(): Token {
    return this.readSize('unit');
  }

  readInt(): Token {
    return this.readWhile('number', (c) => intRegexp.test(c));
  }
  
  readOp(): Token {
    return this.readSize('op');
  }

  readSize(type: TokenType, size = 1): Token {
    const raw = this.raw.slice(this.iter, this.iter + size);
    this.iter += size;
    return {
      type,
      raw,
      start: this.iter - size,
      end: this.iter,
    };
  }

  readWhile(type: TokenType, cb: (char: string) => boolean): Token {
    const start = this.iter++;
    while(cb(this.raw.charAt(this.iter))) {
      this.iter++;
    }
    const raw = this.raw.slice(start, this.iter);
    return {
      type,
      raw,
      start,
      end: this.iter,
    };
  }
}
