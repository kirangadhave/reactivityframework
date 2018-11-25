export type Observer = {
  next?: Function;
  error?: Function;
  complete?: Function;
};

export type Unsubscriber = {
  unsubscribe: Function;
};

export type Predicate = (value) => boolean;

export type SubscriptionFn = (args?: any) => Unsubscriber;

export class Observable {
  private fn: SubscriptionFn;

  constructor(fn: SubscriptionFn) {
    this.fn = fn;
  }

  subscribe(ob: Observer) {
    return this.fn(ob);
  }

  map(fn: Function) {
    return new Observable((observer: Observer) => {
      return this.subscribe({
        next(val) {
          observer.next(fn(val));
        },
        error(err) {
          observer.error(err);
        },
        complete() {
          observer.complete;
        }
      });
    });
  }

  filter(predicate: Predicate) {
    return new Observable((observer: Observer) => {
      return this.subscribe({
        next(val) {
          if (predicate(val)) observer.next(val);
        },
        error(err) {
          observer.error(err);
        },
        complete() {
          observer.complete();
        }
      });
    });
  }

  mergeMap(fn: (value) => Observable) {
    return new Observable(observer => {
      return this.subscribe({
        next(outerValue) {
          fn(outerValue).subscribe({
            next(innerValue) {
              observer.next(innerValue);
            }
          });
        },
        error(err) {
          observer.error(err);
        },
        complete() {
          observer.complete();
        }
      });
    });
  }
}
