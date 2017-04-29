import _ from "lodash";
import Point from "./objects/point";
import {typeCheck} from "./utils/base";
import {CannotFoundError, ArgumentError} from "./errors/errors";
import CoordinateSystem from "./mixins/coordinate_system";
import ORIENTATION from "./global/orientation";

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

		// If param is canvas element
		if (isTypeObject) {
			canvas = _getCanvasByElement(param);
		}

		// If param is canvas id
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
		this._opt = {
			orientation: ORIENTATION.CW
		};
		this._renderList = [];
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
	 * @description Get sketchbook width
	 * @type {Number}
	 * @member Sketchbook#width
	 */
	get width () {
		return this._canvas.width;
	}

	/**
	 * @description Set sketchbook width
	 * @type {Number}
	 * @member Sketchbook#width
	 */
	set width (width) {
		this._canvas.width = width;
	}

	/**
	 * @description Get sketchbook height
	 * @type {Number}
	 * @member Sketchbook#height
	 */
	get height () {
		return this._canvas.height;
	}

	/**
	 * @description Set sketchbook height
	 * @type {Number}
	 * @member Sketchbook#height
	 */
	set height (height) {
		this._canvas.height = height;
	}

	/**
	 * @description scale
	 * @param {Number} xScale xScale
	 * @param {Number} yScale yScale
	 * @member Sketchbook#scale
	 */
	scale (xScale, yScale) {
		this._cs.scale(xScale, yScale);
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
	 * @param {Number} x position x
	 * @param {Number} y position y
	 * @member Sketchbook#translate
	 */
	translate (x, y) {
		this._cs.translate(new Point([x, y]));
	}

	/**
	 * @description get option
	 * @param {String} name property name
	 * @return {Object} option
	 * @member Sketchbook#getOption
	 */
	getOption (name) {
		let hasName = name !== undefined && name !== null;
		if (!hasName) {
			return null;
		}
		return this._opt[name];
	}

	/**
	 * @description set option
	 * @param {String} name property name
	 * @param {Object} value property value
	 * @member Sketchbook#setOption
	 */
	setOption (name, value) {
		let hasName = name !== undefined && name !== null;
		let hasValue = value !== undefined && value !== null;

		if (!hasName || !hasValue) {
			return;
		}

		this._opt[name] = value;
		if (name === "orientation") {
			this._cs.setOption("orientation", value);
		}
	}

	/**
	 * @description add Objects
	 * @param {Object} object added Object
	 * @member Sketchbook#add
	 */
	add (object) {
		if (!object) {
			throw new CannotFoundError("Cannot found object.");
		}

		if (!object.hasOwnProperty('render')) {
			throw new ArgumentError("This object doesn't have render method.");
		}

		if (!typeCheck('function', object.render)) {
			throw new ArgumentError("The render method isn't a function.");
		}
		this._renderList.push(object);
	}

	/**
	 * @description render
	 * @param {Sketchbook} sketchbook Sketchbook
	 * @member Sketchbook#render
	 */
	render (sketchbook) {
		if (!sketchbook) {
			_.each(this._renderList, renderObj=> {
				if (!renderObj.hasOwnProperty('render')) {
					return;
				}
				renderObj.render(this);
			});
			return;
		}

		if (sketchbook && !(sketchbook instanceof Sketchbook)) {
			throw new TypeError("Input wrong parameter.(Different class)");
		}
		sketchbook._context.drawImage(this._canvas, 0, 0);
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