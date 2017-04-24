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
		this._isNeedToUpdate = false;

		this._scaleMatrix = new CanvasMatrix();
		this._rotateMatrix = new CanvasMatrix();
		this._translateMatrix = new CanvasMatrix();
		this._basis = new CanvasMatrix();
	}

	/**
	 * @description scale
	 * @param {Number} scale scale
	 * @member CoordinateSystem#scale
	 */
	scale (scale) {
		this._scale = scale;
		this._scaleMatrix = new CanvasMatrix(scale, 0, 0, scale, 0, 0);
		this._isNeedToUpdate = true;
	}

	/**
	 * @description rotate
	 * @param {Number} radian radian
	 * @member CoordinateSystem#rotate
	 */
	rotate (radian) {
		let a = Math.cos(radian);
		let b = Math.sin(radian);
		let c = -Math.sin(radian);
		let d = Math.cos(radian);

		this._radian = radian;
		this._rotateMatrix = new CanvasMatrix(a, b, c, d, 0, 0);
		this._isNeedToUpdate = true;
	}

	/**
	 * @description translate
	 * @param {Point} position position
	 * @member CoordinateSystem#translate
	 */
	translate (position) {
		this._position = new Point(position);
		this._translateMatrix = new CanvasMatrix(1, 0, 0, 1, -position.x, -position.y);
		this._isNeedToUpdate = true;
	}
}

export default CoordinateSystem;