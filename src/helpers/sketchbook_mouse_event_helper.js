import EventHelper from "./event_helper";
import Sketchbook from "../sketchbook";
import Point from "../objects/point";
import MOUSE_EVENT from "../enums/events/mouse_event";
import {ArgumentError} from "../errors/errors";

/**
 * @description SketchbookMouseEventHelper Class
 * @class SketchbookMouseEventHelper
 */
class SketchbookMouseEventHelper extends EventHelper {

  /**
   * @description SketchbookMouseEventHelper constructor.
   * @constructs SketchbookMouseEventHelper
   */
  constructor (sketchbook) {
    if (!(sketchbook instanceof Sketchbook)) {
      throw new ArgumentError("A element must be Sketchbook.");
    }
    super(sketchbook.canvas);
    this.sketchbook = sketchbook;
  }

  /**
   * @description add event listener
   * @param {Event|String} type type
   * @param {Function} listener listener
   * @param {Boolean} [useCapture] capture boolean
   * @return {Function} listener
   * @member SketchbookMouseEventHelper#addEventListener
   */
  addEventListener (type, listener, useCapture) {
    if (!MOUSE_EVENT.enumValueOf(type)) {
      return null;
    }
    let base = (event)=> {
      let lastX = event.offsetX || (event.pageX - this.sketchbook.offsetLeft);
      let lastY = event.offsetY || (event.pageY - this.sketchbook.offsetTop);

      let origin = this.sketchbook.basis.inverse().multiply(new Point([lastX, lastY]));
      event.originX = origin.x;
      event.originY = origin.y;
    };
    return super.addBaseEventListener(base, type, listener, useCapture);
  }
}

export default SketchbookMouseEventHelper;
