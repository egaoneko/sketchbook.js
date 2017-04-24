import {Vector} from "sylvester-es6";
import {typeCheck} from "../utils/base";
import {ArgumentError} from "../errors/errors";

/**
 * @description Point Class
 * @class Point
 */

class Point {

	/**
	 * @description Point constructor.
	 * @constructs Point
	 */
	constructor (param) {
		if (param instanceof Point) {
			this._vector = param._vector.dup();
			return;
		}

		if (!typeCheck('array', param) || param.length !== 2) {
			throw new ArgumentError("Initialized with wrong elements.");
		}

		this._vector = new Vector(param);
	}

	/**
	 * @description Get x
	 * @type {Number}
	 * @member Point#x
	 */
	get x () {
		return this._vector.e(1);
	}

	/**
	 * @description Get y
	 * @type {Number}
	 * @member Point#y
	 */
	get y () {
		return this._vector.e(2);
	}
}

export default Point;