import { parse } from '../src';

describe('parse', () => {
  it('parse expression correctly', () => {
    expect(parse('+ M\\M')).toEqual({
      type: 'Expression',
      start: 0,
      end: 5,
      body: [
        {
          type: 'Offset',
          op: '+',
          number: 1,
          unit: 'M',
          start: 0,
          end: 3,
        },
        {
          type: 'Period',
          op: '\\',
          number: 1,
          unit: 'M',
          start: 3,
          end: 5,
        }
      ]
    });
  });

  it('parse empty string', () => {
    expect(parse('')).toEqual({
      type: 'Expression',
      start: 0,
      end: 0,
      body: []
    });
  });

  it('parse custom period', () => {
    expect(() => parse('/2w', { customPeriod: false })).toThrow('expect unit(e.g. s, m, h, d, ...) but found \`2\` at (1, 2)');
    expect(parse('/2w', { customPeriod: true })).toEqual({
      type: 'Expression',
      start: 0,
      end: 3,
      body: [
        {
          type: 'Period',
          op: '/',
          number: 2,
          unit: 'w',
          start: 0,
          end: 3,
        }
      ]
    });
  });

  it('throw error when token match failed', () => {
    expect(() => parse(' no - d')).toThrow('unexpected token \`n\` at (1, 2)');
  });

  it('throw error when forget operator', () => {
    expect(() => parse(' now  1d')).toThrow('expect operator(+, -, /, \\) but found \`1\` at (6, 7)');
  });

  it('throw error when forget unit', () => {
    expect(() => parse(' now +1+d')).toThrow('expect unit(e.g. s, m, h, d, ...) but found \`+\` at (7, 8)');
  });

  it('throw end of input error when stop after operator in offset', () => {
    expect(() => parse(' now - ')).toThrow('expect integer or unit(e.g. s, m, h, d, ...) but get the end of input');
  });

  it('throw end of input error when stop after operator in period', () => {
    expect(() => parse('now/')).toThrow('expect unit(e.g. s, m, h, d, ...) but get the end of input');
  });

  it('throw error when input is not string', () => {
    let input: any;
    expect(() => parse(input)).toThrow('unexpected input `undefined`');
    input = null;
    expect(() => parse(input)).toThrow('unexpected input `null`');
    input = 12;
    expect(() => parse(input)).toThrow('unexpected input `12s`');
  })
});
