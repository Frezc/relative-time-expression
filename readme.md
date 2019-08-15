# Relative time expression

[![travis](https://img.shields.io/travis/Frezc/relative-time-expression/master.svg?style=flat-square)](https://travis-ci.org/Frezc/relative-time-expression)
[![Codecov Coverage](https://img.shields.io/codecov/c/github/Frezc/relative-time-expression/master.svg?style=flat-square)](https://codecov.io/gh/Frezc/relative-time-expression/)
[![relative-time-expression](https://img.shields.io/npm/v/relative-time-expression.svg?style=flat-square)](https://www.npmjs.org/package/relative-time-expression)
[![rte-moment](https://img.shields.io/npm/v/rte-moment.svg?style=flat-square)](https://www.npmjs.org/package/rte-moment)
[![period-edge](https://img.shields.io/npm/v/period-edge.svg?style=flat-square)](https://www.npmjs.org/package/period-edge)

This is a expression for relative time. Inspired by Time Units of [grafana](https://grafana.com/).

[Here](https://frezc.github.io/2019/04/26/relative-time-expression/) is a chinese blog about why I create this library.

# Install

## Install moment binding
```sh
npm install rte-moment
```

## Install core (Optional, If you don't use moment)
```sh
npm install relative-time-expression
```

# Usage

## Expression

The expression usually start from `"now"`, like `"now"`, `"now-1d"`. But you can also omit it, like `""`(same as `"now"`), `"-1d"`. After `"now"`, you can append a series of *manipulation*. There are two types of *manipulation*, one is *offset*, the other is *period*.

- *Offset*: Add(+) or Subtract(-) to current moment, constructed with op, integer(optional, default `1`) and unit(you can check blow).
- *Period*: Point to start(/) or end(\\) of period that current moment fall into, constructed with op, integer(optional, default `1`) and unit. The custom period (integer larger than 1) are not supported for year and month periods now.

### unit table
|unit|duration| 
|---|-----|
| y | year |
| M | month |
| w | week |
| d | day |
| h | hour |
| m | minute |
| s | second |

### Examples

- `now - 12h`: 12 hours ago, same as `moment().subtract(12, 'hours')`
- `-1d`: 1 day ago, same as `moment().subtract(1, 'day')`
- `now / d`: the start of today, same as `moment().startOf('day')`
- `now \ w`: the end of this week, same as `moment().endOf('week')`
- `now - w / w`: the start of last week, same as `moment().subtract(1, 'week').startOf('week')`
- `+M\M`: the end of next month, same as `moment().add(1, 'month').endOf('week')`
- `now/4w`: Suppose divide time range from unix timestamp zero by `4 weeks = 4 * 7 * 24 * 60 * 60 * 1000 ms`, and return start of period which `now` fall into.

## Moment binding
```javascript
import parse from 'rte-moment';
const m = parse('now-w/w');
// compatible with grafana, add forceEnd config to make `/` point to end of period
const m1 = parse('now-w/w', { forceEnd: true });

import moment from 'moment';
moment().subtract(1, 'week').startOf('week').isSame(m); // true
moment().subtract(1, 'week').endOf('week').isSame(m1); // true
```

### Custom timezone
If this lib used at server side, you should use timezone from client.
```javascript
import parse from 'rte-moment';
import moment from 'moment-timezone';
const m = parse('now/d', { base: moment().tz('Asia/Shanghai') });

moment().tz('Asia/Shanghai').startOf('day').isSame(m); // true
```

## Custom binding
You can write binding with any time library.

See moment binding code [here](https://github.com/Frezc/relative-time-expression/blob/master/packages/moment/src/index.ts).

## Parse to ast
```javascript
import { parse } from 'relative-time-expression';
const ast = parse('+M/M');
/* ast
{
  type: 'Expression',
  start: 0,
  end: 4,
  body: [
    {
      type: 'Offset',
      op: '+',
      number: 1,
      unit: 'M',
      start: 0,
      end: 2,
    },
    {
      type: 'Period',
      op: '/',
      number: 1,
      unit: 'M',
      start: 2,
      end: 4,
    }
  ]
}
*/
```

## Encode to expression
```javascript
import { encode } from 'relative-time-expression';
encode(ast); // return 'now+M/M'
encode(ast, { displayOne: true }); // return 'now+1M/M'
```

## Standardize
```javascript
import { standardize } from 'relative-time-expression';
standardize(' now   - 1   d /w'); // return 'now-d/w'
standardize(' now   - 1   d /w', { displayOne: true }); // return 'now-1d/w'
```

## Enable custom period
Custom period is disabled default. You should enable it manually.
```javascript
import { parse } from 'relative-time-expression';
parse('+M/4M'); // error!
parse('+M/4M', { customPeriod: true }); // success
``` 

# API

## rte-moment
```typescript
// parse expression to moment
function parseToMoment(
  exp: string,
  options?: { forceEnd?: boolean; base?: moment.Moment; customPeriod?: boolean; }
): moment.Moment;

// and all api from relative-time-expression
```

## relative-time-expression
You can check type definitions [here](https://github.com/Frezc/relative-time-expression/blob/master/packages/core/src/interface.ts).
```typescript
// parse expression to ast
function parse(exp: string, options?: { customPeriod?: boolean; }): Expression;
// same as parse
function decode(exp: string, options?: { customPeriod?: boolean; }): Expression;
// encode ast to expression
function encode(exp: InputExpression, options?: { displayOne?: boolean }): string;
// same as encode
function stringify(exp: InputExpression, options?: { displayOne?: boolean }): string;
// format expression as standard
function standardize(exp: string, options?: { displayOne?: boolean }): string;
```

# Grammar

The grammar is simple:

```bnf
<expression> ::= [<ws>] [now] *([<ws>] <relative> [<ws>])
<relative>   ::= <offset> | <period>
<offset>     ::= (+ | -) <ws> [<number>] <ws> <unit>
<period>     ::= (/ | \) <ws> [<number>] <ws> <unit>
<number>     ::= ('0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9') [<number>]
<unit>       ::= 's' | 'm' | 'h' | 'd' | 'w' | 'M' | 'y'
<ws>         ::= ' ' | '\r' | '\n' | '\t' [<ws>]
```
