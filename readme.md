# Relative time expression

[![travis](https://img.shields.io/travis/Frezc/relative-time-expression/master.svg?style=flat-square)](https://travis-ci.org/Frezc/relative-time-expression)
[![Codecov Coverage](https://img.shields.io/codecov/c/github/Frezc/relative-time-expression/master.svg?style=flat-square)](https://codecov.io/gh/Frezc/relative-time-expression/)
[![relative-time-expression](https://img.shields.io/npm/v/relative-time-expression.svg?style=flat-square)](https://www.npmjs.org/package/relative-time-expression)
[![rte-moment](https://img.shields.io/npm/v/rte-moment.svg?style=flat-square)](https://www.npmjs.org/package/rte-moment)

This is a expression for relative time. Inspired by Time Units of [grafana](https://grafana.com/).

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
- *Period*: Point to start(/) or end(\\) of period that current moment fall into, constructed with op and unit.

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

### examples

- `now - 12h`: 12 hours ago, same as `moment().subtract(12, 'hours')`
- `-1d`: 1 day ago, same as `moment().subtract(1, 'day')`
- `now / d`: the start of today, same as `moment().startOf('day')`
- `now \ w`: the end of this week, same as `moment().endOf('week')`
- `now - w / w`: the start of last week, same as `moment().subtract(1, 'week').startOf('week')`
- `+M\M`: the end of next month, same as `moment().add(1, 'month').endOf('week')`

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

## Custom binding
You can write binding with any time library.

See moment binding code [here](https://github.com/Frezc/relative-time-expression/blob/master/packages/moment/src/index.ts).

## Parse to ast
```javascript
import { parse, encode } from 'relative-time-expression';
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
      unit: 'M',
      start: 2,
      end: 4,
    }
  ]
}
*/
```

## standardize
```javascript
import { standardize } from 'relative-time-expression';
standardize(' now   - 1   d /w'); // return 'now-d/w'
```

# API

## rte-moment
```typescript
// parse expression to moment
function parseToMoment(exp: string, options?: { forceEnd?: boolean; }): moment.Moment;
```

## relative-time-expression
You can check type definitions [here](https://github.com/Frezc/relative-time-expression/blob/master/packages/core/src/interface.ts).
```typescript
// parse expression to ast
function parse(exp: string): Expression;
// same as parse
function decode(exp: string): Expression;
// encode ast to expression
function encode(exp: InputExpression): string;
// same as encode
function stringify(exp: InputExpression): string;
// format expression as standard
function standardize(exp: string): string;

class Tokenizer {
  // parse expression to tokens
  static parse(exp: string): Token[];
  constructor(raw: string);
  parse(): Token[];
}

class Parser {
  // parse tokens to ast
  static parse(tokens: Token[]): Expression;
  constructor(tokens: Token[]);
  parse(): Expression;
}
```

# Grammar

The grammar is simple:

```bnf
<expression> ::= [<ws>] [now] *([<ws>] <relative> [<ws>])
<relative>   ::= <offset> | <period>
<offset>     ::= (+ | -) <ws> [<number>] <ws> <unit>
<period>     ::= (/ | \) <ws> <unit>
<number>    ::= ('0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9') [<number>]
<unit>       ::= 's' | 'm' | 'h' | 'd' | 'w' | 'M' | 'y'
<ws>         ::= ' ' | '\r' | '\n' | '\t' [<ws>]
```
