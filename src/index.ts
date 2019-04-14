import Parser from './parser';
import Tokenizer from './tokenizer';
import encode from './encode';

export function parse(exp: string) {
  return Parser.parse(Tokenizer.parse(exp));
}

export { Parser, Tokenizer, encode };
export const decode = parse;
export const stringify = encode;
