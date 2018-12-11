export type EventHandler = (event?: any) => void;

export type EventHandlerList = Array<EventHandler>;

export type EventHandlerMap = {
  [type: string]: EventHandlerList;
};

let all: EventHandlerMap = {};

export const EventManager = {
  all: (): EventHandlerMap => {
    return all;
  },
  on: (type: string, handler: EventHandler, thisArg?: any) => {
    let eventArr = type.split(".");
    let parent = eventArr[0];
    if (!thisArg) {
      if (eventArr.length > 1)
        (all[parent] || (all[parent] = [])).push(handler);
      (all[type] || (all[type] = [])).push(handler);
    } else {
      if (eventArr.length > 1)
        (all[parent] || (all[parent] = [])).push(handler.bind(thisArg));
      (all[type] || (all[type] = [])).push(handler.bind(thisArg));
    }
  },
  off: (type: string, handler?: EventHandler) => {
    if (handler) {
      if (all[type]) {
        all[type].splice(all[type].indexOf(handler) >>> 0, 1);
      }
    } else {
      if (all[type]) all[type] = [];
    }
  },
  emit: (type: string, evt?: any) => {
    (all[type] || []).slice().map(handler => handler(evt));
  },
  reset: () => {
    all = {};
  },
  events: () => {
    const e = all;
    return e;
  }
};
