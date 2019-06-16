/**
 * moment binder
 */
import moment from 'moment';
import { parse, ParseOptions } from 'relative-time-expression';
import { startOf as dateStartOf, endOf as dateEndOf } from 'period-edge';
import { Period } from 'relative-time-expression/lib/interface';

export * from 'relative-time-expression';

function startOf(m: moment.Moment, p: Period) {
  if (p.number > 1) {
    return moment(dateStartOf(m.toDate(), p.number + p.unit));
  }
  return m.startOf(p.unit);
}

function endOf(m: moment.Moment, p: Period) {
  if (p.number > 1) {
    return moment(dateEndOf(m.toDate(), p.number + p.unit));
  }
  return m.endOf(p.unit);
}

export default function parseToMoment(exp: string, options: { forceEnd?: boolean; base?: moment.Moment } & ParseOptions = {}) {
  const { forceEnd, base = moment(), ...parseOptions } = options;
  const ast = parse(exp, parseOptions);
  return ast.body.reduce((moment, m) => {
    if (m.type === 'Offset') {
      if (m.op === '+') {
        return moment.add(m.number, m.unit);
      } else {
        return moment.subtract(m.number, m.unit);
      }
    } else {
      if (m.op === '/' && !forceEnd) {
        return startOf(moment, m);
      } else {
        return endOf(moment, m);
      }
    }
  }, base);
}
