import Parser from './parser';
import Tokenizer from './tokenizer';
import encode from './encode';
import { InputExpression } from './interface';

export function parse(exp: string) {
  return Parser.parse(Tokenizer.parse(exp));
}

export { Parser, Tokenizer, encode };
export const decode = parse;
export const stringify = encode;
export { ExpError } from './error';

export function standardlize(exp: string) {
  return encode(parse(exp) as InputExpression);
}
