import _ from "lodash";
import {typeCheck} from "../utils/base";
import Point from "../objects/point";

/**
 * @description BoundingBoxHelper Class
 * @class BoundingBoxHelper
 */
class BoundingBoxHelper {

  /**
   * @description BoundingBoxHelper constructor.
   * @constructs BoundingBoxHelper
   */
  constructor () {
    this._minX = +Infinity;
    this._minY = +Infinity;
    this._maxX = -Infinity;
    this._maxY = -Infinity;
  }

  /**
   * @description Get center
   * @type {Point}
   * @member BoundingBoxHelper#center
   */
  get center () {
    let x = (this._minX + this._maxX) * 0.5;
    let y = (this._minY + this._maxY) * 0.5;
    return new Point([x, y]);
  }

  /**
   * @description add Point
   * @param {Array|Point} points added points
   * @member BoundingBoxHelper#add
   */
  add (points) {

    if (!typeCheck('array', points)) {
      this._add(points);
      return;
    }

    _.each(points, point => {
      this._add(point);
    });
  }

  /**
   * @private
   * @description add Point
   * @param {Point} point added point
   * @method _add
   */
  _add (point) {
    if (!(point instanceof Point)) {
      throw new TypeError("The parameter must be Point.");
    }

    this._minX = Math.min(this._minX, point.x);
    this._minY = Math.min(this._minY, point.y);
    this._maxX = Math.max(this._maxX, point.x);
    this._maxY = Math.max(this._maxY, point.y);
  }

  /**
   * @description clear min max
   * @member BoundingBoxHelper#clear
   */
  clear () {
    this._minX = +Infinity;
    this._minY = +Infinity;
    this._maxX = -Infinity;
    this._maxY = -Infinity;
  }
}

export default BoundingBoxHelper;
