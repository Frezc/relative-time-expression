# 0.5.0
- new package: [period-edge](https://www.npmjs.com/package/period-edge). Help moment-binding to calculate custom period.
- core, moment-binding: add param `customPeriod` to enable custom period. You can use syntax like `now/4w` if enabled.

# 0.4.3
- core: add displayOne option to show 1 when encode
- moment-binding: add base options to support different timezone

# 0.4.1 & 0.4.2
- core: add standradize to format string
- moment-binding: export all function from core

# 0.4.0
- core: throw error object with infomation instead of message string.
- moment-binding: add forceEnd to be compatible with grafana pattern.

# 0.3.2 & 0.3.3
- optimize error message

# 0.3.1
- bugfix: parse won't throw error `Cannot read property 'type' of undefined` when parse `"now-"`