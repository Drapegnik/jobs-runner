import Parallel from './Parallel';

const runner = new Parallel({
  parallelJobs: 2,
});

let result = 'before/';

runner
  .job(step0)
  .job(step1)
  .job(step2)
  .job(step3)
  .job(step4)
  .done(onDone);

result += 'after/';

function step0(done) {
  console.log('step0');

  result += 'step0/';

  done('step0');
}

function step1(done) {
  console.log('step1');

  result += 'step1/';

  setTimeout(done, 3000, 'step1');
}

setTimeout(() => (result += 'after0-1/'), 2500);

function step2(done) {
  console.log('step2');

  result += 'step2/';

  setTimeout(done, 1500, 'step2');
}

function step3(done) {
  console.log('step3');

  result += 'step3/';

  setTimeout(done, 2000, 'step3');
}

setTimeout(() => (result += 'after2-3/'), 4500);

function step4(done) {
  console.log('step4');

  result += 'step4/';

  setTimeout(done, 500, 'step4');
}

setTimeout(() => (result += 'after4/'), 5500);

let isPassed = false;
function onDone(results) {
  console.log('onDone', results, result);

  console.assert(Array.isArray(results), 'expect result to be array');
  console.assert(results.length === 5, 'the results length must be 5');
  console.assert(results[0] === 'step0', 'Wrong answer 1');
  console.assert(results[1] === 'step1', 'Wrong answer 2');
  console.assert(results[2] === 'step2', 'Wrong answer 2');
  console.assert(results[3] === 'step3', 'Wrong answer 3');
  console.assert(results[4] === 'step4', 'Wrong answer 4');
  console.assert(
    result === 'before/after/step0/step1/after0-1/step2/step3/after2-3/step4/after4/',
    'Wrong steps'
  );
  console.log('Thanks, all works fine');

  isPassed = true;
}

setTimeout(() => {
  if (isPassed) return;

  console.error('Test is not done.');
}, 6000);
