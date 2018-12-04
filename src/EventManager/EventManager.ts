export type EventHandler = (event?: any) => void;

export type EventHandlerList = Array<EventHandler>;

export type EventHandlerMap = {
  [type: string]: EventHandlerList;
};

const all: EventHandlerMap = {};

export const EventManager = {
  on: (type: string, handler: EventHandler) => {
    (all[type] || (all[type] = [])).push(handler);
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
  }
};
