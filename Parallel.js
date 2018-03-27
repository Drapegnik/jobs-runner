export default class Parallel {
  constructor({ parallelJobs }) {
    this.parallelJobs = parallelJobs;
  }

  job(callback) {
    return this;
  }

  done(callback) {}
}
