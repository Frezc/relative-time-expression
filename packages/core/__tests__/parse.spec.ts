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
  })

  it('throw error when token match failed', () => {
    expect(() => parse(' no - d')).toThrow('unknown token \'n\' at (1, 2)');
  });

  it('throw error when forget operator', () => {
    expect(() => parse(' now  1d')).toThrow('expect operator(+, -, /, \\) but found 1 at (6, 7)');
  });

  it('throw error when forget unit', () => {
    expect(() => parse(' now +1+d')).toThrow('expect unit(e.g. s, m, h, d, ...) but found + at (7, 8)');
  });
});
