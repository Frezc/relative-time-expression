# Relative time expression

This is a expression for relative time. Inspired by Time Units of [grafana](https://grafana.com/).

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

# Example

- `now - 12h`: 12 hours ago, same as `moment().subtract(12, 'hours')`
- `-1d`: 1 day ago, same as `moment().subtract(1, 'day')`
- `now / d`: the start of today, same as `moment().startOf('day')`
- `now \ w`: the end of this week, same as `moment().endOf('week')`
- `now - w / w`: the start of last week, same as `moment().subtract(1, 'week').startOf('week')`
- `+M\M`: the end of next month, same as `moment().add(1, 'month').endOf('week')`
