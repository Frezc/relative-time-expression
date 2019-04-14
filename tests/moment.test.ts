import parseToMoment from '../src/moment';
import moment from 'moment';

describe('bind moment', () => {
  it('parse correctly', () => {
    expect(parseToMoment('now-w/w+2d\\d').isSame(
      moment().subtract(1, 'week').startOf('week').add(2, 'days').endOf('day')
    ));
  })
});