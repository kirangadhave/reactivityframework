import { Observable } from "./../src/Observable/Observable";

const interval = (ms: number = 0) => {
  return new Observable(obs => {
    let count = 0;

    const id = setInterval(() => {
      obs.next(count++);
    }, ms);

    return {
      unsubscribe() {
        clearInterval(id);
      }
    };
  });
};

const of = (...values) => {
  return new Observable(observer => {
    values.forEach(v => observer.next(v));
    return {
      unsubscribe: () => {}
    };
  });
};

const intervalSubs = interval(1000)
  .mergeMap(value => of(value))
  .map(v => v * v)
  .filter(v => v % 2 === 0)
  .subscribe({
    next(v) {
      console.log(v);
    }
  });

setTimeout(intervalSubs.unsubscribe, 8000);
