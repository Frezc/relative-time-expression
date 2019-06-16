import Parser from '../src/parser';

test('tokenize correctly', () => {
  expect(Parser.parse([
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
      type: 'number',
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
  ])).toEqual({
    type: 'Expression',
    start: 0,
    end: 15,
    body: [
      {
        type: 'Offset',
        op: '-',
        number: 12,
        unit: 'd',
        start: 5,
        end: 10,
      },
      {
        type: 'Period',
        op: '/',
        unit: 'w',
        number: 1,
        start: 10,
        end: 13,
      },
      {
        type: 'Offset',
        op: '+',
        number: 1,
        unit: 's',
        start: 13,
        end: 15,
      },
    ]
  });
})