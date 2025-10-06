class Timer {
  constructor() {
    this.startTime = null;
  }

  start() {
    this.startTime = new Date();
  }

  stop() {
    const endTime = new Date();
    const duration = (endTime - this.startTime) / 1000; // seconds
    return duration.toFixed(2);
  }
}

module.exports = Timer;
