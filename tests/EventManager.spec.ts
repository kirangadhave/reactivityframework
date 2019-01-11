import { expect } from "chai";
import "mocha";

import { Manager } from "./../src/index";

describe("Manager#", () => {
  beforeEach(() => {
    Manager.reset();
  });

  describe("on()", () => {
    it("should be a function", () => {
      expect(Manager)
        .to.have.property("on")
        .that.is.a("function");
    });

    it("should register handlers for new type", () => {
      let func = () => {};
      Manager.on("test", func).on("test2", func);
      expect(Manager.all())
        .to.have.property("test")
        .that.deep.equals([func]);
    });

    it("should append handlers for existing types", () => {
      let func1 = () => {};
      let func2 = () => {
        console.log("");
      };
      Manager.on("test", func1);
      Manager.on("test", func2);
      expect(Manager.all())
        .to.have.property("test")
        .that.deep.equals([func1, func2]);
    });

    it("should not change case", () => {
      let func1 = () => {};
      let func2 = () => {};
      Manager.on("TEST", func1);
      Manager.on("TeSt", func2);
      expect(Manager.all())
        .to.have.property("TEST")
        .that.deep.equals([func1]);
      expect(Manager.all()).to.not.have.property("test");
      expect(Manager.all())
        .to.have.property("TeSt")
        .that.deep.equals([func2]);
      expect(Manager.all()).to.not.have.property("tEsT");
    });
  });

  describe("off()", () => {
    it("should be a function", () => {
      expect(Manager)
        .to.have.property("off")
        .that.is.a("function");
    });

    it("should remove handler for any type", () => {
      let func = () => {};
      Manager.on("test", func);
      expect(Manager.all())
        .to.have.property("test")
        .that.deep.equals([func]);
      Manager.off("test", func);
      expect(Manager.all()).to.have.property("test").that.is.empty;
    });
  });
});
