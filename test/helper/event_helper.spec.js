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
    it('addEventListener base event closer', () => {
      let baseEventExpected = "test base";
      let baseEventActual = null;

      let baseEvent = () => {
        baseEventActual = baseEventExpected;
      };
      let customEvent = () => {
      };

      eventHelper.addEventListener(baseEvent, 'test', customEvent);
      element.dispatchEvent(testEvent);

      assert.strictEqual(baseEventActual, baseEventExpected);
    });

    it('addEventListener base event bind', () => {
      let baseEventExpected = {test: "test base"};
      let baseEventActual = null;

      let baseEvent = function () {
        baseEventActual = this.test;
      }.bind(baseEventExpected);
      let customEvent = () => {
      };

      eventHelper.addEventListener(baseEvent, 'test', customEvent);
      element.dispatchEvent(testEvent);

      assert.strictEqual(baseEventActual, baseEventExpected.test);
    });

    it('addEventListener custom event closer', () => {
      let customEventExpected = "test custom";
      let customEventActual = null;

      let baseEvent = () => {
      };
      let customEvent = () => {
        customEventActual = customEventExpected;
      };

      eventHelper.addEventListener(baseEvent, 'test', customEvent);
      element.dispatchEvent(testEvent);

      assert.strictEqual(customEventActual, customEventExpected);
    });

    it('addEventListener custom event bind', () => {
      let customEventExpected = {test: "test base"};
      let customEventActual = null;

      let baseEvent = () => {
      };
      let customEvent = function () {
        customEventActual = this.test;
      }.bind(customEventExpected);

      eventHelper.addEventListener(baseEvent, 'test', customEvent);
      element.dispatchEvent(testEvent);

      assert.strictEqual(customEventActual, customEventExpected.test);
    });
  });
});
