import {Matrix} from "sylvester-es6";
import {ArgumentError} from "../errors/errors";

/**
 * @description CanvasMatrix Class
 * @class CanvasMatrix
 */

class CanvasMatrix {

	/**
	 * @description CanvasMatrix constructor.
	 * @constructs CanvasMatrix
	 */
	constructor (...params) {
		let hasParams = params.length > 0;
		let isWrongParams = params.length !== 1 && params.length !== 6;

		if (hasParams && isWrongParams) {
			throw new ArgumentError("Initialized with wrong parameters.");
		}

		if (params.length === 6) {
			this._matrix = new Matrix([
				[params[0], params[1], params[4]],
				[params[2], params[3], params[5]],
				[0, 0, 1]
			]);
			return;
		}

		if (params.length === 1 && !(params[0] instanceof CanvasMatrix)) {
			throw new ArgumentError("Initialized with wrong parameter.(Different class)");
		}

		if (params.length === 1) {
			this._matrix = params[0]._matrix.dup();
			return;
		}

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
		return this._matrix.e(1, 3);
	}

	/**
	 * @description Get f
	 * @type {Number}
	 * @member CanvasMatrix#f
	 */
	get f () {
		return this._matrix.e(2, 3);
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

	/**
	 * @description Is equal CanvasMatrix
	 * @type {Number}
	 * @member CanvasMatrix#equal
	 */
	equal (other) {
		return this._matrix.eql(other._matrix);
	}
}

export default CanvasMatrix;