import Point from "./objects/point";
import {typeCheck} from "./utils/base";
import {CannotFoundError} from "./errors/errors";
import CoordinateSystem from "./mixins/coordinate_system";

/**
 * @description Sketchbook Class
 * @class Sketchbook
 */
class Sketchbook {

	/**
	 * @description Sketchbook constructor.
	 * @constructs Sketchbook
	 */
	constructor (param) {
		let canvas = null;
		let isTypeObject = typeCheck('object', param);
		if (isTypeObject) {
			canvas = _getCanvasByElement(param);
		}

		let isTypeString = typeCheck('string', param);
		if (isTypeString) {
			canvas = _getCanvasById(param);
		}

		if (canvas === null) {
			canvas = document.createElement('canvas');
		}
		this._canvas = canvas;
		this._context = canvas.getContext('2d');
		this._cs = new CoordinateSystem();
	}

	/**
	 * @description Get canvas element
	 * @type {Object}
	 * @member Sketchbook#canvas
	 */
	get canvas () {
		return this._canvas;
	}

	/**
	 * @description scale
	 * @param {Number} scale scale
	 * @member Sketchbook#scale
	 */
	scale (scale) {
		this._cs.scale(scale);
	}

	/**
	 * @description rotate
	 * @param {Number} radian radian
	 * @member Sketchbook#rotate
	 */
	rotate (radian) {
		this._cs.rotate(radian);
	}

	/**
	 * @description translate
	 * @param {Point} position position
	 * @member Sketchbook#translate
	 */
	translate (position) {
		this._cs.translate(position);
	}

	render (x, y, w, h) {
		let lt = new Point([x, y]);
		let lb = new Point([x, y + h]);
		let rt = new Point([x + w, y]);
		let rb = new Point([x + w, y + h]);
		lt = this._cs.basis.multiply(lt);
		lb = this._cs.basis.multiply(lb);
		rt = this._cs.basis.multiply(rt);
		rb = this._cs.basis.multiply(rb);

		this._context.beginPath();
		this._context.moveTo(lt.x, lt.y);
		this._context.lineTo(lb.x, lb.y);
		this._context.lineTo(rb.x, rb.y);
		this._context.lineTo(rt.x, rt.y);
		this._context.lineTo(lt.x, lt.y);
		this._context.stroke();
	}
}

/**
 * @description Get canvas by element/
 * @param {Object} canvas canvas element
 * @method _getCanvasByElement
 */
function _getCanvasByElement (canvas) {
	let isCanvas = canvas.nodeName && canvas.nodeName === 'CANVAS';

	if (!isCanvas) {
		throw new TypeError("Input element is not canvas.");
	}
	return canvas;
}

/**
 * @description Get canvas by element/
 * @param {String} id canvas id
 * @method _setCanvasById
 */
function _getCanvasById (id) {
	let canvas = document.getElementById(id);

	if (typeCheck('null', canvas)) {
		throw new CannotFoundError("Cannot found element by id.");
	}
	return canvas;
}

export default Sketchbook;