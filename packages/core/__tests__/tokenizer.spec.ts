import Tokenizer from '../src/tokenizer';

test('tokenize correctly', () => {
  expect(Tokenizer.parse('now  - 12d/ w+s')).toEqual([
    {
      type: 'keyword',
      raw: 'now',
      start: 0,
      end: 3,
    },
    {
      type: 'ws',
      raw: '  ',
      start: 3,
      end: 5,
    },
    {
      type: 'op',
      raw: '-',
      start: 5,
      end: 6,
    },
    {
      type: 'ws',
      raw: ' ',
      start: 6,
      end: 7,
    },
    {
      type: 'int',
      raw: '12',
      start: 7,
      end: 9,
    },
    {
      type: 'unit',
      raw: 'd',
      start: 9,
      end: 10,
    },
    {
      type: 'op',
      raw: '/',
      start: 10,
      end: 11,
    },
    {
      type: 'ws',
      raw: ' ',
      start: 11,
      end: 12,
    },
    {
      type: 'unit',
      raw: 'w',
      start: 12,
      end: 13,
    },
    {
      type: 'op',
      raw: '+',
      start: 13,
      end: 14,
    },
    {
      type: 'unit',
      raw: 's',
      start: 14,
      end: 15,
    },
  ]);
})