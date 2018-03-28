# jobs-runner

:arrow_forward: test task for [workshop](https://www.facebook.com/events/2013393755356297/?notif_t=event_calendar_create&notif_id=1521623408595950)

## task

* Implement class `Parallel`, that run jobs in parallel (async).
* Can't run more than `n` jobs in one time (sets as `parallelJobs` in constructor).
* Should be work in different environments (`browser`, `node.js`, `React Native`) & pass the [test](https://gist.github.com/z4o4z/be8215262d3c6977a53c9e1213fb5280).

### public `Parallel` api:

```js
class Parallel {
  constructor({ parallelJobs }) {}
  job(callback) {} // returns this
  done(callback) {}
}
```

## result

```
step0
step1
step2
step3
step4
onDone [ 'step0', 'step1', 'step2', 'step3', 'step4' ] before/after/step0/step1/after0-1/step2/step3/after2-3/step4/after4/
Thanks, all works fine
```
