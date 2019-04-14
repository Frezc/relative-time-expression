# Relative time expression

[![travis](https://img.shields.io/travis/project/Frezc/relative-time-expression/master.svg?style=flat-square)](https://travis-ci.org/Frezc/relative-time-expression)
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

## Moment binding
```javascript
import parse from 'rte-moment';
const m = parse('now-w/w');

import moment from 'moment';
moment().subtract(1, 'week').startOf('week').isSame(m); // true
```

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

# API

## rte-moment
```typescript
function parse(exp: string): moment.Moment;
```

## relative-time-expression
You can check type definitions [here](https://github.com/Frezc/relative-time-expression/blob/master/packages/core/src/interface.ts).
```typescript
function parse(exp: string): Expression;
function decode(exp: string): Expression;
function encode(exp: InputExpression): string;
function stringify(exp: InputExpression): string;

class Tokenizer {
  static parse(exp: string): Token[];
  constructor(raw: string);
  parse(): Token[];
}

class Parser {
  static parse(tokens: Token[]): Expression;
  constructor(tokens: Token[]);
  parse(): Expression;
}
```

# Expression examples

- `now - 12h`: 12 hours ago, same as `moment().subtract(12, 'hours')`
- `-1d`: 1 day ago, same as `moment().subtract(1, 'day')`
- `now / d`: the start of today, same as `moment().startOf('day')`
- `now \ w`: the end of this week, same as `moment().endOf('week')`
- `now - w / w`: the start of last week, same as `moment().subtract(1, 'week').startOf('week')`
- `+M\M`: the end of next month, same as `moment().add(1, 'month').endOf('week')`

# Grammar

The grammar is simple:

```bnf
<expression> ::= [<ws>] [now] *([<ws>] <relative> [<ws>])
<relative>   ::= <offset> | <period>
<offset>     ::= (+ | -) <ws> [<number>] <ws> <unit>
<period>     ::= (/ | \) <ws> <unit>
<number>    ::= ('0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9') [<number>]
<unit>       ::= 's' | 'm' | 'h' | 'd' | 'w' | 'M' | 'y'
<ws>         ::= ' ' | '\f' | '\r' | '\n' | '\v' | '\t' [<ws>]
```
