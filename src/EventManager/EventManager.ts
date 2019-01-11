export type EventHandler = (event?: any) => void;

export type EventHandlerList = Array<EventHandler>;

export type EventHandlerMap = {
  [type: string]: EventHandlerList;
};

let all: EventHandlerMap = {};

type EventManager = {
  all: () => EventHandlerMap;
  on: (type: string, handler: EventHandler, thisArg?: any) => EventManager;
  off: (type: string, handler?: EventHandler | undefined) => EventManager;
  emit: (type: string, evt?: any) => EventManager;
  reset: () => EventManager;
  events: () => EventHandlerMap;
};

export const Manager: EventManager = {
  all: (): EventHandlerMap => {
    return all;
  },
  on: (type: string, handler: EventHandler, thisArg?: any): EventManager => {
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
    return Manager;
  },
  off: (type: string, handler?: EventHandler): EventManager => {
    if (handler) {
      if (all[type]) {
        all[type].splice(all[type].indexOf(handler) >>> 0, 1);
      }
    } else {
      if (all[type]) all[type] = [];
    }
    return Manager;
  },
  emit: (type: string, evt?: any): EventManager => {
    (all[type] || []).slice().map(handler => handler(evt));
    return Manager;
  },
  reset: (): EventManager => {
    all = {};
    return Manager;
  },
  events: (): EventHandlerMap => {
    return all;
  }
};
