export type EventHandler = (event?: any) => void;

export type EventHandlerList = Array<EventHandler>;

export type EventHandlerMap = {
  [type: string]: EventHandlerList;
};

export class EventManager {
  private static all: EventHandlerMap = {};

  static on(type: string, handler: EventHandler) {
    (EventManager.all[type] || (EventManager.all[type] = [])).push(handler);
  }

  static off(type: string, handler: EventHandler) {
    if (EventManager.all[type])
      EventManager.all[type].splice(
        EventManager.all[type].indexOf(handler) >>> 0,
        1,
      );
  }

  static emit(type: string, evt?: any) {
    (EventManager.all[type] || []).slice().map(handler => handler(evt));
  }
}
