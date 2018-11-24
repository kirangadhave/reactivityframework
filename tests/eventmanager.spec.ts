import { expect, assert } from "chai";
import "mocha";

import { EventManager } from "../index";

describe("Event Manager", () => {
  describe("Initialization Test", InitializationTests);
});

/**
 *  Initialization Tests for Event Manager.
 */

function InitializationTests() {
  // Tests .on function for init error
  it("EventManager.on() should throw not initialized error", () => {
    assert.throws(() => {
      EventManager.on("test", () => {});
    }, "EventManager not initialized. Use EventManager.init()");
  });

  // Tests .off function for init error
  it("EventManager.off() should throw not initialized error", () => {
    assert.throws(() => {
      EventManager.off("test", () => {});
    }, "EventManager not initialized. Use EventManager.init()");
  });

  // Tests .emit function for init error
  it("EventManager.emit() should throw not initialized error", () => {
    assert.throws(() => {
      EventManager.emit("test", {});
    }, "EventManager not initialized. Use EventManager.init()");
  });

  // Tests init function without any parameters. Must return true.
  it("EventManager.init() should return true.", () => {
    expect(EventManager.init()).to.equal(true);
  });

  // Tests .on function for init error
  it("EventManager.on() shouldn't throw not initialized error", () => {
    assert.doesNotThrow(() => {
      EventManager.on("test", () => {});
    }, Error);
  });

  // Tests .off function for init error
  it("EventManager.off() shouldn't throw not initialized error", () => {
    assert.doesNotThrow(() => {
      EventManager.off("test", () => {});
    }, Error);
  });

  // Tests .emit function for init error
  it("EventManager.emit() shouldn't throw not initialized error", () => {
    assert.doesNotThrow(() => {
      EventManager.emit("test", {});
    }, Error);
  });

  // Tests init function for already initialized error
  it("EventManger.init() should throw already initialized error", () => {
    assert.throws(EventManager.init, Error);
  });

  // Tests init function for already initialized error with EventHandlerMap passed in
  it("EventManger.init() shouldn't throw already initialized error", () => {
    let init: boolean = false;
    assert.doesNotThrow(() => {
      init = EventManager.init({});
    }, Error);
    expect(init).to.equal(true);
  });

  // Tests init function for already initialized error with null EventHandlerMap passed in
  it("EventManger.init() should throw already initialized error", () => {
    assert.throws(() => {
      EventManager.init(null);
    }, Error);
  });

  // Tests init function for already initialized error with forcedReset
  it("EventManger.init() shouldn't throw already initialized error", () => {
    let init: boolean = false;
    assert.doesNotThrow(() => {
      init = EventManager.init(null, true);
    }, Error);
    expect(init).to.equal(true);
  });
}
