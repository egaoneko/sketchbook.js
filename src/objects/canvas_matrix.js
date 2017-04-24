import {Matrix} from "sylvester-es6";

/**
 * @description CanvasMatrix Class
 * @class CanvasMatrix
 */

class CanvasMatrix {

	/**
	 * @description CanvasMatrix constructor.
	 * @constructs CanvasMatrix
	 */
	constructor () {
		this._matrix = Matrix.I(3);
	}

	/**
	 * @description Get a
	 * @type {Number}
	 * @member CanvasMatrix#a
	 */
	get a () {
		return this._matrix.e(1, 1);
	}

	/**
	 * @description Get b
	 * @type {Number}
	 * @member CanvasMatrix#b
	 */
	get b () {
		return this._matrix.e(1, 2);
	}

	/**
	 * @description Get c
	 * @type {Number}
	 * @member CanvasMatrix#c
	 */
	get c () {
		return this._matrix.e(2, 1);
	}

	/**
	 * @description Get d
	 * @type {Number}
	 * @member CanvasMatrix#d
	 */
	get d () {
		return this._matrix.e(2, 2);
	}

	/**
	 * @description Get e
	 * @type {Number}
	 * @member CanvasMatrix#e
	 */
	get e () {
		return this._matrix.e(3, 1);
	}

	/**
	 * @description Get f
	 * @type {Number}
	 * @member CanvasMatrix#f
	 */
	get f () {
		return this._matrix.e(3, 2);
	}

	/**
	 * @description Get rows
	 * @type {Number}
	 * @member CanvasMatrix#rows
	 */
	get rows () {
		return this._matrix.rows();
	}

	/**
	 * @description Get cols
	 * @type {Number}
	 * @member CanvasMatrix#cols
	 */
	get cols () {
		return this._matrix.cols();
	}
}

export default CanvasMatrix;