import chai from "chai";
import EventHelper from "../../src/helper/event_helper";


let assert = chai.assert;

describe('EventHelper', () => {
  let eventHelper;
  let element = document.createElement('div');
  let testEvent = null;

  before(function () {
    testEvent = document.createEvent('Event');
    testEvent.initEvent('test', true, true);
  });

  beforeEach(function () {
    eventHelper = new EventHelper(element);
  });

  describe('initialized EventHelper', () => {
    it('initialized element', () => {
      assert.strictEqual(eventHelper._element, element);
    });

    it('initialized without element', () => {
      assert.throws(()=>new EventHelper(), Error, "A element must be needed for create.");
    });
  });

  describe('methods', () => {
    it('addEventListener listener', () => {
      let listenerExpected = "test";
      let listenerActual = null;

      let listener = () => {
        listenerActual = listenerExpected;
      };

      eventHelper.addEventListener('test', listener);
      element.dispatchEvent(testEvent);

      assert.strictEqual(listenerActual, listenerExpected);
    });

    it('removeEventListener listener', () => {
      let listenerExpected = "test";
      let listenerActual = "test";

      let listener = () => {
        listenerActual = "";
      };

      element.addEventListener('test', listener);
      eventHelper.removeEventListener('test', listener);
      element.dispatchEvent(testEvent);

      assert.strictEqual(listenerActual, listenerExpected);
    });

    it('removeEventListener listener by return value', () => {
      let listenerExpected = "test";
      let listenerActual = "test";

      let listener = () => {
        listenerActual = "";
      };

      let returnListener = eventHelper.addEventListener('test', listener);
      eventHelper.removeEventListener('test', returnListener);
      element.dispatchEvent(testEvent);

      assert.strictEqual(listenerActual, listenerExpected);
    });

    it('addBaseEventListener base listener closer', () => {
      let baseListenerExpected = "test base";
      let baseListenerActual = null;

      let baseListener = () => {
        baseListenerActual = baseListenerExpected;
      };
      let listener = () => {
      };

      eventHelper.addBaseEventListener(baseListener, 'test', listener);
      element.dispatchEvent(testEvent);

      assert.strictEqual(baseListenerActual, baseListenerExpected);
    });

    it('addBaseEventListener base listener bind', () => {
      let baseListenerExpected = {test: "test base"};
      let baseListenerActual = null;

      let baseListener = function () {
        baseListenerActual = this.test;
      }.bind(baseListenerExpected);
      let listener = () => {
      };

      eventHelper.addBaseEventListener(baseListener, 'test', listener);
      element.dispatchEvent(testEvent);

      assert.strictEqual(baseListenerActual, baseListenerExpected.test);
    });

    it('addBaseEventListener listener closer', () => {
      let listenerExpected = "test";
      let listenerActual = null;

      let baseListener = () => {
      };
      let listener = () => {
        listenerActual = listenerExpected;
      };

      eventHelper.addBaseEventListener(baseListener, 'test', listener);
      element.dispatchEvent(testEvent);

      assert.strictEqual(listenerActual, listenerExpected);
    });

    it('addBaseEventListener listener bind', () => {
      let listenerExpected = {test: "test"};
      let listenerActual = null;

      let baseListener = () => {
      };
      let listener = function () {
        listenerActual = this.test;
      }.bind(listenerExpected);

      eventHelper.addBaseEventListener(baseListener, 'test', listener);
      element.dispatchEvent(testEvent);

      assert.strictEqual(listenerActual, listenerExpected.test);
    });

    it('removeBaseEventListener base listener closer', () => {
      let baseListenerExpected = "test base";
      let baseListenerActual = "test base";

      let baseListener = () => {
        baseListenerActual = null;
      };
      let listener = () => {
      };

      let mergedListener = eventHelper.addBaseEventListener(baseListener, 'test', listener);
      eventHelper.removeBaseEventListener('test', mergedListener);
      element.dispatchEvent(testEvent);

      assert.strictEqual(baseListenerActual, baseListenerExpected);
    });

    it('removeBaseEventListener listener closer', () => {
      let listenerExpected = "test";
      let listenerActual = "test";

      let baseListener = () => {
      };
      let listener = () => {
        listenerActual = "";
      };

      let mergedListener = eventHelper.addBaseEventListener(baseListener, 'test', listener);
      eventHelper.removeBaseEventListener('test', mergedListener);
      element.dispatchEvent(testEvent);

      assert.strictEqual(listenerActual, listenerExpected);
    });
  });
});
