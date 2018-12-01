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

  static on(type: string, handler: EventHandler) {
    EventManager.all[type] || (EventManager.all[type] = []).push(handler);
  }

  static off(type: string, handler: EventHandler) {
    if (EventManager.all[type])
      EventManager.all[type].splice(
        EventManager.all[type].indexOf(handler) >>> 0,
        1
      );
  }

  static emit(type: string, evt?: any) {
    (EventManager.all[type] || []).slice().map(handler => handler(evt));
    (EventManager.all["*"] || []).slice().map(handler => handler(type, evt));
  }

  static saveToSessionStorage(saveName: string) {
    if (!sessionStorageExists)
      throw new Error("Session Storage does not exist");
    try {
      window.sessionStorage[saveName] = EventManager.getEventHandlerMapString();
    } catch (err) {
      throw err;
    }
  }

  static loadFromSessionStorage(saveName: string) {
    if (!sessionStorageExists())
      throw new Error("Session Storage does not exist");
    try {
      EventManager.all = JSON.parse(window.sessionStorage[saveName]);
    } catch (err) {
      throw err;
    }
  }

  static getEventHandlerMapString() {
    return JSON.stringify(EventManager.all);
  }
}

function sessionStorageExists() {
  if (window) if (window.sessionStorage) return true;
  return false;
}
