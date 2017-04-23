import {Matrix} from "sylvester-es6";

/**
 * @description CanvasMatrix Class
 * @class CanvasMatrix
 */

class CanvasMatrix extends Matrix {

	/**
	 * @description CanvasMatrix constructor.
	 * @constructs CanvasMatrix
	 */
	constructor () {
		super([
			[1, 0, 0],
			[0, 1, 0],
			[0, 0, 1],
		]);
	}

	/**
	 * @description Get a
	 * @type {Number}
	 * @member CanvasMatrix#a
	 */
	get a () {
		return super.e(1, 1);
	}

	/**
	 * @description Get b
	 * @type {Number}
	 * @member CanvasMatrix#b
	 */
	get b () {
		return super.e(1, 2);
	}

	/**
	 * @description Get c
	 * @type {Number}
	 * @member CanvasMatrix#c
	 */
	get c () {
		return super.e(2, 1);
	}

	/**
	 * @description Get d
	 * @type {Number}
	 * @member CanvasMatrix#d
	 */
	get d () {
		return super.e(2, 2);
	}

	/**
	 * @description Get e
	 * @type {Number}
	 * @member CanvasMatrix#e
	 */
	get e () {
		return super.e(3, 1);
	}

	/**
	 * @description Get f
	 * @type {Number}
	 * @member CanvasMatrix#f
	 */
	get f () {
		return super.e(3, 2);
	}
}

export default CanvasMatrix;