/**
 * moment binder
 */
import moment from 'moment';
import { parse } from 'relative-time-expression';

export default function parseToMoment(exp: string) {
  const ast = parse(exp);
  return ast.body.reduce((moment, m) => {
    if (m.type === 'Offset') {
      if (m.op === '+') {
        return moment.add(m.number, m.unit);
      } else {
        return moment.subtract(m.number, m.unit);
      }
    } else {
      if (m.op === '/') {
        return moment.startOf(m.unit);
      } else {
        return moment.endOf(m.unit);
      }
    }
  }, moment());
}
