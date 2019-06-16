import parseToMoment from '../src/index';
import moment from 'moment';

describe('bind moment', () => {
  it('parse correctly', () => {
    expect(parseToMoment('now-w/w+2d\\d').isSame(
      moment().subtract(1, 'week').startOf('week').add(2, 'days').endOf('day')
    )).toEqual(true);
  });

  it('compatible with grafana', () => {
    console.log(parseToMoment('now-d/d', { forceEnd: true }));
    expect(parseToMoment('now-d/d', { forceEnd: false }).isSame(
      moment().subtract(1, 'd').startOf('d')
    )).toEqual(true);
    expect(parseToMoment('now-d/d', { forceEnd: true }).isSame(
      moment().subtract(1, 'd').endOf('d')
    )).toEqual(true);
  });

  it('parse with different timezone', () => {
    expect(parseToMoment('now/d', { base: moment().utc() }).isSame(
      moment().utc().startOf('day')
    )).toBe(true);
  });

  it('parse custom period', () => {
    expect(parseToMoment('now/2d', { customPeriod: true, base: moment('2019-06-14T17:00:00') }).isSame(
      moment('2019-06-13T00:00:00')
    )).toBe(true);
    expect(parseToMoment('now\\2d', { customPeriod: true, base: moment('2019-06-14T17:00:00') }).isSame(
      moment('2019-06-14T23:59:59.999')
    )).toBe(true);
    expect(() => parseToMoment('now/2M', { customPeriod: true })).toThrow('unsupport custom period `2M`');
  });
});