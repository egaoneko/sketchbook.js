import {ArgumentError} from "../errors/errors";

/**
 * @description MouseEventHelper Class
 * @class MouseEventHelper
 */
class MouseEventHelper {

  /**
   * @description MouseEventHelper constructor.
   * @constructs MouseEventHelper
   */
  constructor(element) {

    if (!element) {
      throw new ArgumentError("A element must be needed for create.");
    }

    this._element = element;
  }

  //TODO mouse event helper
}

export default MouseEventHelper;
