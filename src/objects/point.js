import {Vector} from "sylvester-es6";

/**
 * @description Point Class
 * @class Point
 */

class Point extends Vector {
	/**
	 * @description Get x
	 * @type {Number}
	 * @member Point#x
	 */
	get x () {
		return this.e(1);
	}

	/**
	 * @description Get y
	 * @type {Number}
	 * @member Point#y
	 */
	get y () {
		return this.e(2);
	}
}

export default Point;