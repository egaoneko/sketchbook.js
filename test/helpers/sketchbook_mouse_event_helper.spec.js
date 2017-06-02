import chai from "chai";
import _ from "lodash";
import simulate from "../test_utils/simulate";
import SketchbookMouseEventHelper from "../../src/helpers/sketchbook_mouse_event_helper";
import MOUSE_EVENT from "../../src/enums/events/mouse_event";
import Sketchbook from "../../src/sketchbook";

let assert = chai.assert;

describe('SketchbookMouseEventHelper', () => {
  let sketchbookMouseEventHelper;
  let sketchbook = new Sketchbook();

  beforeEach(() => {
    sketchbookMouseEventHelper = new SketchbookMouseEventHelper(sketchbook);
  });

  describe('initialized SketchbookMouseEventHelper', () => {
    it('initialized element', () => {
      assert.strictEqual(sketchbookMouseEventHelper._element, sketchbook.canvas);
    });

    it('initialized without element', () => {
      assert.throws(()=>new SketchbookMouseEventHelper(), Error, "A element must be Sketchbook.");
    });

    it('initialized without sketchbook', () => {
      assert.throws(()=>new SketchbookMouseEventHelper({}), Error, "A element must be Sketchbook.");
    });
  });

  describe('methods', () => {
    it('addEventListener listener', () => {
      let listener = (evt) => {
        // TODO Research under situation
        // Caution : If event has not originX or originY, other some tests are broken. 
        assert.strictEqual(evt.origin.x, 50);
        assert.strictEqual(evt.origin.y, 50);
      };
      sketchbook.scale(2, 2);
      checkForMouseEvents(listener);
    });

    function checkForMouseEvents (listener) {
      _.each(MOUSE_EVENT.enumValues, event => {
        let eventName = event.name;
        sketchbookMouseEventHelper.addEventListener(eventName, listener);
        simulate(sketchbookMouseEventHelper._element, eventName, {pointerX: 100, pointerY: 100});
      });
    }
  });
});
