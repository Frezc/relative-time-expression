import Parser, { ParserOptions } from './parser';
import Tokenizer from './tokenizer';
import encode from './encode';
import { InputExpression } from './interface';

export type ParseOptions = ParserOptions;

export function parse(exp: string, options?: ParseOptions) {
  if (typeof exp === 'string') {
    return Parser.parse(Tokenizer.parse(exp), options);
  }
  throw new Error(`unexpected input \`${exp}\``);
}

export { Parser, Tokenizer, encode };
export const decode = parse;
export const stringify = encode;
export { ExpError } from './error';

export function standardize(exp: string, options?: { displayOne?: boolean; }) {
  return encode(parse(exp, { customPeriod: true }) as InputExpression, options);
}

export const standardlize = standardize;
