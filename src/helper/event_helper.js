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
   * @param {Event|String} type type
   * @param {Function} listener listener
   * @param {Boolean} [useCapture] capture boolean
   * @return {Function} listener
   * @member EventHelper#addEventListener
   */
  addEventListener(type, listener, useCapture) {
    this._element.addEventListener(type, listener, useCapture);
    return listener;
  }

  /**
   * @description add base event listener
   * @param {Function} baseListener base listener
   * @param {Event|String} type type
   * @param {Function} listener listener
   * @param {Boolean} [useCapture] capture boolean
   * @return {Function} merged listener
   * @member EventHelper#addBaseEventListener
   */
  addBaseEventListener(baseListener, type, listener, useCapture) {
    let mergedListener = (...args)=> {
      baseListener(...args);
      return listener(...args);
    };
    this.addEventListener(type, mergedListener, useCapture);
    return mergedListener;
  }

  /**
   * @description remove event listener
   * @param {Event|String} type type
   * @param {Function} listener listener
   * @param {Boolean} [useCapture] capture boolean
   * @member EventHelper#removeEventListener
   */
  removeEventListener(type, listener, useCapture) {
    this._element.removeEventListener(type, listener, useCapture);
  }

  /**
   * @description remove base event listener
   * @param {Event|String} type type
   * @param {Function} listener listener
   * @param {Boolean} [useCapture] capture boolean
   * @member EventHelper#removeBaseEventListener
   */
  removeBaseEventListener(type, listener, useCapture) {
    this.removeEventListener(type, listener, useCapture);
  }
}

export default EventHelper;
