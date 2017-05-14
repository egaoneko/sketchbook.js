import {Matrix as SylvesterMatrix} from "sylvester-es6";
import {ArgumentError} from "../errors/errors";
import Point from "./point";
import Matrix from "./matrix";

/**
 * @description CanvasMatrix Class
 *
 *   a   c   e
 *   b   d   f
 *   0   0   1
 *
 * @class CanvasMatrix
 */

class CanvasMatrix {

  /**
   * @description CanvasMatrix constructor.
   * @constructs CanvasMatrix
   */
  constructor(...params) {
    let hasParams = params.length > 0;
    let isWrongParams = params.length !== 1 && params.length !== 6;

    if (hasParams && isWrongParams) {
      throw new ArgumentError("Initialized with wrong parameters.");
    }

    if (params.length === 6) {
      this._matrix = new SylvesterMatrix([
        [params[0], params[2], params[4]],
        [params[1], params[3], params[5]],
        [0, 0, 1]
      ]);
      return;
    }

    if (params.length === 1 && !(params[0] instanceof CanvasMatrix)) {
      throw new TypeError("Initialized with wrong parameter.(Different class)");
    }

    if (params.length === 1) {
      this._matrix = params[0]._matrix.dup();
      return;
    }

    this._matrix = SylvesterMatrix.I(3);
  }

  /**
   * @description Get a
   * @type {Number}
   * @member CanvasMatrix#a
   */
  get a() {
    return this._matrix.e(1, 1);
  }

  /**
   * @description Get b
   * @type {Number}
   * @member CanvasMatrix#b
   */
  get b() {
    return this._matrix.e(2, 1);
  }

  /**
   * @description Get c
   * @type {Number}
   * @member CanvasMatrix#c
   */
  get c() {
    return this._matrix.e(1, 2);
  }

  /**
   * @description Get d
   * @type {Number}
   * @member CanvasMatrix#d
   */
  get d() {
    return this._matrix.e(2, 2);
  }

  /**
   * @description Get e
   * @type {Number}
   * @member CanvasMatrix#e
   */
  get e() {
    return this._matrix.e(1, 3);
  }

  /**
   * @description Get f
   * @type {Number}
   * @member CanvasMatrix#f
   */
  get f() {
    return this._matrix.e(2, 3);
  }

  /**
   * @description Get rows
   * @type {Number}
   * @member CanvasMatrix#rows
   */
  get rows() {
    return this._matrix.rows();
  }

  /**
   * @description Get cols
   * @type {Number}
   * @member CanvasMatrix#cols
   */
  get cols() {
    return this._matrix.cols();
  }

  /**
   * @description Is equal CanvasMatrix
   * @param {CanvasMatrix} other matrix for compare
   * @return {Boolean} is equal
   * @member CanvasMatrix#equal
   */
  equal(other) {
    return this._matrix.eql(other._matrix);
  }

  /**
   * @description Add CanvasMatrix
   * @param {CanvasMatrix} other matrix for multiply
   * @return {CanvasMatrix} multiplied matrix
   * @member CanvasMatrix#add
   */
  add(other) {
    if (!(other instanceof CanvasMatrix)) {
      throw new TypeError("Added by wrong parameter.(Different class)");
    }
    let addedMatrix = this._matrix.add(other._matrix);
    let a = addedMatrix.e(1, 1);
    let b = addedMatrix.e(2, 1);
    let c = addedMatrix.e(1, 2);
    let d = addedMatrix.e(2, 2);
    let e = addedMatrix.e(1, 3);
    let f = addedMatrix.e(2, 3);
    return new CanvasMatrix(a, b, c, d, e, f);
  }

  /**
   * @description Multiply CanvasMatrix
   * @param {CanvasMatrix|Point} other object for multiply
   * @return {CanvasMatrix|Point} multiplied object
   * @member CanvasMatrix#multiply
   */
  multiply(other) {
    if (other instanceof CanvasMatrix) {
      let multipliedMatrix = this._matrix.multiply(other._matrix);
      let a = multipliedMatrix.e(1, 1);
      let b = multipliedMatrix.e(2, 1);
      let c = multipliedMatrix.e(1, 2);
      let d = multipliedMatrix.e(2, 2);
      let e = multipliedMatrix.e(1, 3);
      let f = multipliedMatrix.e(2, 3);
      return new CanvasMatrix(a, b, c, d, e, f);
    }

    if (other instanceof Point) {
      let multipliedVector = this._matrix.multiply(other._vector);
      let x = multipliedVector.e(1);
      let y = multipliedVector.e(2);
      return new Point([x, y]);
    }

    throw new TypeError("Multiplied by wrong parameter.(Different class)");
  }

  /**
   * @description Inverse CanvasMatrix
   * @return {Matrix} inverse
   * @member CanvasMatrix#multiply
   */
  inverse() {
    let inverse = this._matrix.inverse();
    if (!inverse) {
      return inverse;
    }
    return new Matrix(inverse);
  }
}

export default CanvasMatrix;
