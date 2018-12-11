import { expect } from "chai";
import "mocha";

import { EventManager } from "./../src/index";

describe("EventManager#", () => {
  beforeEach(() => {
    EventManager.reset();
  });

  describe("on()", () => {
    it("should be a function", () => {
      expect(EventManager)
        .to.have.property("on")
        .that.is.a("function");
    });

    it("should register handlers for new type", () => {
      let func = () => {};
      EventManager.on("test.hello", func);
      expect(EventManager.all())
        .to.have.property("test")
        .that.deep.equals([func]);
    });
  });
});
