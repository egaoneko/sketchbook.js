import Point from "../objects/point";
import CanvasMatrix from "../objects/canvas_matrix";

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
		this._position = new Point([0, 0]);
		this._scale = 1;
		this._radian = 0.0;

		this._scaleMatrix = new CanvasMatrix();
		this._rotateMatrix = new CanvasMatrix();
		this._translateMatrix = new CanvasMatrix();
		this._basis = new CanvasMatrix();
	}

	/**
	 * @description Get position
	 * @type {Object}
	 * @member CoordinateSystem#position
	 */
	get position () {
		return this._position;
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