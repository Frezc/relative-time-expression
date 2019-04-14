# Relative time expression

This is a expression for relative time. Inspired by Time Units of [grafana](https://grafana.com/).

# Install
```shell
yarn add relative-time-expression
// or
npm install relative-time-expression
```

# Usage

## Use moment binder
```javascript
import parseToMoment from 'relative-time-expression/lib/moment';

```

```javascript
import { parse, encode } from 'relative-time-expression';
const ast = parse('+M/M');
/* ast
{
  type: 'Expression',
  start: 0,
  end: 5,
  body: [
    {
      type: 'Offset',
      op: '+',
      number: 1,
      unit: 'M',
      start: 0,
      end: 3,
    },
    {
      type: 'Period',
      op: '\\',
      unit: 'M',
      start: 3,
      end: 5,
    }
  ]
}
*/


```

```javascript

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
