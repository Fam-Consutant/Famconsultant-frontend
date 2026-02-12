class LoadingManager {
  constructor() {
    this.count = 0;
    this.subscribers = new Set();
  }

  isBrowser() {
    return typeof window !== 'undefined';
  }

  subscribe(listener) {
    if (typeof listener !== 'function') return () => {};
    this.subscribers.add(listener);
    listener(this.count);
    return () => {
      this.subscribers.delete(listener);
    };
  }

  notify() {
    if (!this.isBrowser()) return;
    this.subscribers.forEach((listener) => {
      try {
        listener(this.count);
      } catch (err) {
        console.error('Loader subscriber failed', err);
      }
    });
  }

  start() {
    if (!this.isBrowser()) return () => {};
    this.count += 1;
    this.notify();
    return () => this.finish();
  }

  finish() {
    if (!this.isBrowser()) return;
    this.count = Math.max(0, this.count - 1);
    this.notify();
  }

  track(promise) {
    const done = this.start();
    if (!promise || typeof promise.finally !== 'function') return done;
    promise.finally(done);
    return promise;
  }
}

export const loadingManager = new LoadingManager();

export default loadingManager;
