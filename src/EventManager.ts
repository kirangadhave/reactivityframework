export type EventHandler = (event?: any) => void;
export type WildCardEventHandler = (type: string, event?: any) => void;

export type EventHandlerList = Array<EventHandler>;
export type WildCardEventHandlerList = Array<WildCardEventHandler>;

export type EventHandlerMap = {
  "*"?: WildCardEventHandlerList;
  [type: string]: EventHandlerList;
};

export class EventManager {
  private static all: EventHandlerMap;
  private static isInitialized: boolean = false;

  static init(all?: EventHandlerMap, forcedReset: boolean = false): boolean {
    if (!EventManager.isInitialized) {
      EventManager.all = all || Object.create(null);
      EventManager.isInitialized = true;
      return EventManager.isInitialized;
    } else if (all) {
      EventManager.all = all;
      return EventManager.isInitialized;
    } else if (forcedReset) {
      EventManager.all = Object.create(null);
      return EventManager.isInitialized;
    }
    throw new Error(
      "EventManager already initialized. If you want to reinitialize set forcedReset flag or pass in EventHandlerMap object"
    );
  }

  static on(type: string, handler: EventHandler) {
    if (!EventManager.isInitialized)
      throw new Error("EventManager not initialized. Use EventManager.init()");
    EventManager.all[type] || (EventManager.all[type] = []).push(handler);
  }

  static off(type: string, handler: EventHandler) {
    if (!EventManager.isInitialized)
      throw new Error("EventManager not initialized. Use EventManager.init()");
    if (EventManager.all[type])
      EventManager.all[type].splice(
        EventManager.all[type].indexOf(handler) >>> 0,
        1
      );
  }

  static emit(type: string, evt: any) {
    if (!EventManager.isInitialized)
      throw new Error("EventManager not initialized. Use EventManager.init()");
    (EventManager.all[type] || []).slice().map(handler => handler(evt));
    (EventManager.all["*"] || []).slice().map(handler => handler(type, evt));
  }
}
