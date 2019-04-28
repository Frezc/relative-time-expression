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

export function standardize(exp: string, options?: { displayOne?: boolean; }) {
  return encode(parse(exp) as InputExpression, options);
}

export const standardlize = standardize;
