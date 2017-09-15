## Changelog

#### Version 0.1.0003 [Parental Trust]
* Modified the `TimerEvent` constructor arguments. Now uses en abstract object `eventInit` as second arguments.
* When creating a new `TimerEvent`, it will require a `Timer` as `target` or the `TimerEvent.isTrusted` will be `false`.
* Now uses `TimerEvent.time` to return the timer position.
* Uses `TimerEvent.marker` to return the marker that triggered the event, if any.
* Added `Event` as `__proto__.__proto__` within the `TimerEvent`. This way both `event instanceof TimerEvent` and `event instanceof Event` will return `true`.

#### Version 0.1.0002 [Getting Closure]
* Moved everything into a closure.
* Closure uses dynamic `context` instead of `window`.
* Fixed handling of decimal (float) intervals.
* PHP builder now uses `build.json` for it's build instructions.

#### Version 0.1.0001 [Play]
* Initial release.
* Mostly commented and refactored.
* Simple PHP builder file to put everything together.
