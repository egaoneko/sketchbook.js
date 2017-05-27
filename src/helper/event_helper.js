import {ArgumentError} from "../errors/errors";

/**
 * @description EventHelper Class
 * @class EventHelper
 */
class EventHelper {

  /**
   * @description EventHelper constructor.
   * @constructs EventHelper
   */
  constructor(element) {

    if (!element) {
      throw new ArgumentError("A element must be needed for create.");
    }

    this._element = element;
  }

  /**
   * @description add event listener
   * @param {Function} baseEvent base event
   * @param {Event|String} event base event
   * @param {Function} customEvent custom event
   * @param {Boolean} useCapture capture boolean
   * @member EventHelper#addEventListener
   */
  addEventListener(baseEvent, event, customEvent, useCapture) {
    this._element.addEventListener(event, ()=> {
      baseEvent();
      customEvent();
    }, useCapture);
  }

  // TODO removeEventListener
}

export default EventHelper;
