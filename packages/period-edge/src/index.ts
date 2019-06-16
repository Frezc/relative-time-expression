
const regexp = /(\d+)([smhdw])/;
const UnitDurationInMs = {
  s: 1000,
  m: 1000 * 60,
  h: 1000 * 60 * 60,
  d: 1000 * 60 * 60 * 24,
  w: 1000 * 60 * 60 * 24 * 7,
}
type Unit = keyof typeof UnitDurationInMs;

function matchPeriod(period: string): [number, Unit] {
  const result = regexp.exec(period);
  if (result) {
    return [parseInt(result[1]), result[2] as Unit];
  }
  throw new Error(`unsupport custom period \`${period}\``);
}

export function startOf(date: Date, period: string): Date {
  const [count, unit] = matchPeriod(period);
  const duration = count * UnitDurationInMs[unit];
  const offset = date.getTimezoneOffset() * UnitDurationInMs.m;
  // utc ts -> local ts, calculate start of -> utc ts
  const ts = Math.floor((date.valueOf() - offset) / duration) * duration + offset;
  if (unit === 'w') {
    return new Date(ts - UnitDurationInMs.d * 3);
  }
  return new Date(ts);
}

export function endOf(date: Date, period: string): Date {
  const [count, unit] = matchPeriod(period);
  const duration = count * UnitDurationInMs[unit];
  const offset = date.getTimezoneOffset() * UnitDurationInMs.m;
  const ts = Math.ceil((date.valueOf() - offset) / duration) * duration + offset - 1;
  if (unit === 'w') {
    return new Date(ts - UnitDurationInMs.d * 3);
  }
  return new Date(ts);
}
