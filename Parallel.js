class Parallel {
  constructor({ parallelJobs }) {
    this.parallelJobs = parallelJobs;
    this.running = 0;
    this.index = 0;
    this.queue = [];
    this.results = [];
    this.run = false;
  }

  job(callback) {
    this._addToQueue(callback);
    return this;
  }

  done(callback) {
    this.run = true; // start jobs only after calling `.done`
    this._addToQueue(callback.bind(null, this.results));
  }

  _addToQueue(callback) {
    const { index } = this;
    // save index for restoring results order
    const end = this._end.bind(this, index);
    this.queue.push(callback.bind(null, end));
    this.index += 1;
    this._run();
  }

  _run() {
    if (!this.queue.length || !this.run || this.running) {
      return;
    }
    while (this.running < this.parallelJobs) {
      const callback = this.queue.shift();
      this.running += 1;
      setTimeout(callback);
      // last job - `done` - should wait for all others
      if (this.queue.length < 2) {
        return;
      }
    }
  }

  _end(index, value) {
    this.results.splice(index, 0, value);
    this.running -= 1;
    this._run();
  }
}

module.exports = Parallel;
