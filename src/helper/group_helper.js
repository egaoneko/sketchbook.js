import _ from "lodash";
import {typeCheck} from "../utils/base";
import {CannotFoundError} from "../errors/errors";

/**
 * @description GroupHelper Class
 * @class GroupHelper
 */
class GroupHelper {

  /**
   * @description GroupHelper constructor.
   * @constructs GroupHelper
   */
  constructor() {
    this._objects = [];
    this._distinct = false;
    this._validator = null;
  }

  /**
   * @description Get distinct
   * @type {Boolean}
   * @member GroupHelper#distinct
   */
  get distinct() {
    return this._distinct;
  }

  /**
   * @description Set distinct
   * @type {Boolean}
   * @member GroupHelper#distinct
   */
  set distinct(distinct) {
    this._distinct = distinct;
  }

  /**
   * @description Get validator
   * @type {Function}
   * @member GroupHelper#validator
   */
  get validator() {
    return this._validator;
  }

  /**
   * @description Set validator
   * @type {Function}
   * @member GroupHelper#validator
   */
  set validator(validator) {
    if (!typeCheck('function', validator)) {
      throw new TypeError("The validator must be function.");
    }
    this._validator = validator;
  }

  /**
   * @description add Objects
   * @param {Array|Object} objects added Shapes
   * @member GroupHelper#add
   */
  add(objects) {
    if (!objects) {
      throw new CannotFoundError("Cannot found objects.");
    }

    if (!typeCheck('array', objects)) {
      this._add(objects);
      return;
    }

    _.each(objects, object => {
      this._add(object);
    });
  }

  /**
   * @private
   * @description add Objects
   * @param {Object} object added shape
   * @method _add
   */
  _add(object) {
    if (this.validator) {
      this.validator();
    }

    if (this.distinct && this._objects.includes(object)) {
      return;
    }

    this._objects.push(object);
  }

  /**
   * @description iterate objects and run callback
   * @param {Function} callback
   * @member GroupHelper#add
   */
  iterate(callback) {
    if (!typeCheck('function', callback)) {
      throw new TypeError("The callback must be function.");
    }
    _.each(this._objects, object=> {
      callback(object);
    });
  }
}

export default GroupHelper;
