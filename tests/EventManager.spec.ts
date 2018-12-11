import {expect} from 'chai';
import 'mocha';

import {EventManager} from './../src/index';

describe('EventManager#', () => {
  beforeEach(() => {
    EventManager.reset();
  });

  describe('on()', () => {
    it('should be a function', () => {
      expect(EventManager)
        .to.have.property('on')
        .that.is.a('function');
    });

    it('should register handlers for new type', () => {
      let func = () => {};
      EventManager.on('test', func);
      expect(EventManager.all())
        .to.have.property('test')
        .that.deep.equals([func]);
    });

    it('should append handlers for existing types', () => {
      let func1 = () => {};
      let func2 = () => {
        console.log('');
      };
      EventManager.on('test', func1);
      EventManager.on('test', func2);
      expect(EventManager.all())
        .to.have.property('test')
        .that.deep.equals([func1, func2]);
    });

    it('should not change case', () => {
      let func1 = () => {};
      let func2 = () => {};
      EventManager.on('TEST', func1);
      EventManager.on('TeSt', func2);
      expect(EventManager.all())
        .to.have.property('TEST')
        .that.deep.equals([func1]);
      expect(EventManager.all()).to.not.have.property('test');
      expect(EventManager.all())
        .to.have.property('TeSt')
        .that.deep.equals([func2]);
      expect(EventManager.all()).to.not.have.property('tEsT');
    });
  });
});
