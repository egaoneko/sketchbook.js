import {Vector} from "sylvester-es6";

/**
 * @description Coordinate System Class
 * @class CoordinateSystem
 */

class CoordinateSystem {

	/**
	 * @description CoordinateSystem constructor.
	 * @constructs CoordinateSystem
	 */
	constructor () {
		this._position = new Vector([0, 0]);
		this._scale = 1;
		this._radian = 0.0;
	}

	/**
	 * @description Get position
	 * @type {Object}
	 * @member CoordinateSystem#position
	 */
	get position () {
		return {
			x: this._position.e(1),
			y: this._position.e(2)
		};
	}

	/**
	 * @description Get scale
	 * @type {Object}
	 * @member CoordinateSystem#scale
	 */
	get scale () {
		return this._scale;
	}

	/**
	 * @description Get radian
	 * @type {Object}
	 * @member CoordinateSystem#radian
	 */
	get radian () {
		return this._radian;
	}
}

export default CoordinateSystem;