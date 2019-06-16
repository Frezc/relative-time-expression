import { startOf, endOf } from '../src';

describe('period-edge', () => {
  it('startOf', () => {
    expect(startOf(new Date('2019-06-14T17:00:00+08:00'), '12h')).toEqual(new Date('2019-06-14T12:00:00+08:00'));
    expect(startOf(new Date('2019-06-14T17:00:00+08:00'), '1w')).toEqual(new Date('2019-06-10T00:00:00+08:00'));
    expect(startOf(new Date('2019-06-14T17:00:00+08:00'), '4w')).toEqual(new Date('2019-06-10T00:00:00+08:00'));
  });

  it('endOf', () => {
    expect(endOf(new Date('2019-06-14T17:00:00+08:00'), '12h')).toEqual(new Date('2019-06-14T23:59:59.999+08:00'));
    expect(endOf(new Date('2019-06-14T17:00:00+08:00'), '1w')).toEqual(new Date('2019-06-16T23:59:59.999+08:00'));
    expect(endOf(new Date('2019-06-14T17:00:00+08:00'), '4w')).toEqual(new Date('2019-07-07T23:59:59.999+08:00'));
  });

  it('throw with invalid period', () => {
    expect(() => startOf(new Date(), 'a')).toThrow('unsupport custom period `a`');
    expect(() => startOf(new Date(), '2y')).toThrow('unsupport custom period `2y`');
  })
});
