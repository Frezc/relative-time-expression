# Period Edge

This package aims to help calculate the start & end timestamp of custom period, like 4 weeks.
This is a sub-project of [relative-time-expression](https://github.com/Frezc/relative-time-expression).

# Install
```shell
npm i period-edge
```

# Usage
```javascript
import { startOf, endOf } from 'period-edge';

// Suppose we are in Shanghai(+8h), and it's 2019-06-14 18:00:00.
expect(startOf(new Date(), '12h')).toEqual(new Date('2019-06-14T12:00:00+08:00'));
expect(endOf(new Date(), '12h')).toEqual(new Date('2019-06-14T23:59:59+08:00'));
```

# Api
```typescript
function startOf(date: Date, period: string): Date;
function endOf(date: Date, period: string): Date;
```

# Period
Period constructed with integer and unit string, like 2w.
Supported units: s, m, h, d, w.

Regular expression:
```javascript
/(\d+)([smhdw])/
```

# Special logic about week period
1. Week period **use monday as first day** according to **ISO 8601**, if you want to use sunday, you could subtract one day to result.
2. This lib will use `1970-01-05T00:00:00` in your timezone as first week to calculate multiple weeks period.
