import Point from "./point";
import CanvasMatrix from "./canvas_matrix";
import {ORIENTATION} from "../global/global";

/**
 * @description Coordinate System Class
 * @class CoordinateSystem
 */
class CoordinateSystem {

  /**
   * @description CoordinateSystem constructor.
   * @constructs CoordinateSystem
   */
  constructor(options = {}) {
    this._position = new Point([0, 0]);
    this._xScale = 1;
    this._yScale = 1;
    this._radian = 0.0;
    this._isNeedToUpdate = false;
    this._opt = {
      orientation: ORIENTATION.CW
    };

    this._basis = new CanvasMatrix();

    Object.assign(this._opt, options);
  }

  /**
   * @description Get basis
   * @type {CanvasMatrix}
   * @member CoordinateSystem#basis
   */
  get basis() {
    return new CanvasMatrix(this._basis);
  }

  /**
   * @description Set basis
   * @type {CanvasMatrix}
   * @member CoordinateSystem#basis
   */
  set basis(basis) {
    if (!(basis instanceof CanvasMatrix)) {
      throw new TypeError("Input basis is not CanvasMatrix.");
    }

    this._basis = basis;
  }

  /**
   * @description scale
   * @param {Number} xScale xScale
   * @param {Number} yScale yScale
   * @member CoordinateSystem#scale
   */
  scale(xScale, yScale) {
    let scaleMatrix = new CanvasMatrix(xScale, 0, 0, yScale, 0, 0);

    this._xScale = xScale;
    this._yScale = yScale;
    this._basis = this._basis.multiply(scaleMatrix);
    this._isNeedToUpdate = true;
  }

  /**
   * @description rotate
   * @param {Number} radian radian
   * @member CoordinateSystem#rotate
   */
  rotate(radian) {
    let a, b, c, d;
    if (this._opt.orientation === ORIENTATION.CCW) {
      a = Math.cos(radian);
      b = -Math.sin(radian);
      c = Math.sin(radian);
      d = Math.cos(radian);
    } else {
      a = Math.cos(radian);
      b = Math.sin(radian);
      c = -Math.sin(radian);
      d = Math.cos(radian);
    }
    let rotateMatrix = new CanvasMatrix(a, b, c, d, 0, 0);

    this._radian = radian;
    this._basis = this._basis.multiply(rotateMatrix);
    this._isNeedToUpdate = true;
  }

  /**
   * @description translate
   * @param {Point} position position
   * @member CoordinateSystem#translate
   */
  translate(position) {
    let translateMatrix = new CanvasMatrix(1, 0, 0, 1, position.x, position.y);

    this._position = new Point(position);
    this._basis = this._basis.multiply(translateMatrix);
    this._isNeedToUpdate = true;
  }

  /**
   * @description get option
   * @param {String} name property name
   * @return {Object} option
   * @member CoordinateSystem#getOption
   */
  getOption(name) {
    let hasName = name !== undefined && name !== null;
    if (!hasName) {
      return null;
    }
    return this._opt[name];
  }

  /**
   * @description set option
   * @param {String} name property name
   * @param {Object} value property value
   * @member CoordinateSystem#setOption
   */
  setOption(name, value) {
    let hasName = name !== undefined && name !== null;
    let hasValue = value !== undefined && value !== null;

    if (!hasName || !hasValue) {
      return;
    }

    this._opt[name] = value;
  }
}

export default CoordinateSystem;
