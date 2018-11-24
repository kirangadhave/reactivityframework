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
  it("EventManager.on() should throw not initialized error", () => {
    assert.throws(() => {
      EventManager.on("test", () => {});
    }, "EventManager not initialized. Use EventManager.init()");
  });

  it("EventManager.off() should throw not initialized error", () => {
    assert.throws(() => {
      EventManager.off("test", () => {});
    }, "EventManager not initialized. Use EventManager.init()");
  });

  it("EventManager.emit() should throw not initialized error", () => {
    assert.throws(() => {
      EventManager.emit("test", {});
    }, "EventManager not initialized. Use EventManager.init()");
  });

  it("EventManager.init() should return true.", () => {
    expect(EventManager.init()).to.equal(true);
  });

  it("EventManager.on() shouldn't throw not initialized error", () => {
    assert.doesNotThrow(() => {
      EventManager.on("test", () => {});
    }, Error);
  });

  it("EventManager.off() shouldn't throw not initialized error", () => {
    assert.doesNotThrow(() => {
      EventManager.off("test", () => {});
    }, Error);
  });

  it("EventManager.emit() shouldn't throw not initialized error", () => {
    assert.doesNotThrow(() => {
      EventManager.emit("test", {});
    }, Error);
  });
}
