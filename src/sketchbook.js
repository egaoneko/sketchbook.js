import {typeCheck} from "./utils/base";
import {CannotFoundError} from "./errors/errors";

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
	}

	/**
	 * @description Get canvas element
	 * @type {Object}
	 * @member Sketchbook#canvas
	 */
	get canvas () {
		return this._canvas;
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