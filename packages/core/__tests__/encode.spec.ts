import { encode } from '../src';
import { InputExpression } from '../src/interface';

describe('encode', () => {
  it('encode simple expression correctly', () => {
    expect(encode({
      type: 'Expression',
      body: [
        {
          type: 'Offset',
          op: '+',
          number: 12,
          unit: 'M',
        },
      ]
    } as InputExpression)).toEqual('now+12M');
  });

  it('encode complex expression correctly', () => {
    expect(encode({
      type: 'Expression',
      body: [
        {
          type: 'Offset',
          op: '+',
          number: 1,
          unit: 'M',
        },
        {
          type: 'Period',
          op: '\\',
          number: 1,
          unit: 'd',
        },
        {
          type: 'Offset',
          op: '-',
          number: 2,
          unit: 'h',
        },
        {
          type: 'Period',
          op: '/',
          number: 1,
          unit: 'h',
        },
      ]
    } as InputExpression)).toEqual('now+M\\d-2h/h');
  });

  it('encode empty expression', () => {
    expect(encode({
      type: 'Expression',
      body: []
    })).toEqual('now');
  });

  it('show 1 when set displayOne to true', () => {
    expect(encode({
      type: 'Expression',
      body: [
        {
          type: 'Offset',
          op: '+',
          number: 1,
          unit: 'M',
        },
        {
          type: 'Period',
          op: '\\',
          number: 1,
          unit: 'd',
        },
        {
          type: 'Offset',
          op: '-',
          number: 1,
          unit: 'h',
        },
      ]
    } as InputExpression, { displayOne: true })).toEqual('now+1M\\d-1h');
  })
});
