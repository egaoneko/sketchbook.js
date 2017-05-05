import _ from "lodash";
import Point from "../objects/point";
import CoordinateSystem from "../mixins/coordinate_system";
import Sketchbook from "../sketchbook";
import {ExtendingError} from "../errors/errors";

const cs_options = ["orientation"];

/**
 * @description Shape Class
 * @class Shape
 */
class Shape {

  /**
   * @description Shape constructor.
   * @constructs Shape
   */
  constructor(options = {}) {
    this._defaultCanvasOpt = {
      fillStyle: '#000000',
      strokeStyle: '#000000',
      shadowColor: '#000000',
      shadowBlur: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,

      lineCap: 'butt',
      lineJoin: 'miter',
      lineWidth: 1,
      miterLimit: 10,

      globalAlpha: 1.0,
      globalCompositeOperation: 'source-over',
    };
    this._cs = new CoordinateSystem();
    this._opt = Object.assign({
      x: 0,
      y: 0,
      visible: true
    }, this._defaultCanvasOpt);

    this.setOptions(options);
    this._position = new Point([this._opt.x, this._opt.y]);
  }

  /**
   * @description Get fillStyle
   * @type {String}
   * @member Shape#fillStyle
   */
  get fillStyle() {
    return this._opt.fillStyle;
  }

  /**
   * @description Set fillStyle
   * @type {String}
   * @member Shape#fillStyle
   */
  set fillStyle(fillStyle) {
    this._opt.fillStyle = fillStyle;
  }

  /**
   * @description Get strokeStyle
   * @type {String}
   * @member Shape#strokeStyle
   */
  get strokeStyle() {
    return this._opt.strokeStyle;
  }

  /**
   * @description Set strokeStyle
   * @type {String}
   * @member Shape#strokeStyle
   */
  set strokeStyle(strokeStyle) {
    this._opt.strokeStyle = strokeStyle;
  }

  /**
   * @description Get shadowColor
   * @type {String}
   * @member Shape#shadowColor
   */
  get shadowColor() {
    return this._opt.shadowColor;
  }

  /**
   * @description Set shadowColor
   * @type {String}
   * @member Shape#shadowColor
   */
  set shadowColor(shadowColor) {
    this._opt.shadowColor = shadowColor;
  }

  /**
   * @description Get shadowBlur
   * @type {Number}
   * @member Shape#shadowBlur
   */
  get shadowBlur() {
    return this._opt.shadowBlur;
  }

  /**
   * @description Set shadowBlur
   * @type {Number}
   * @member Shape#shadowBlur
   */
  set shadowBlur(shadowBlur) {
    this._opt.shadowBlur = shadowBlur;
  }

  /**
   * @description Get shadowOffsetX
   * @type {Number}
   * @member Shape#shadowOffsetX
   */
  get shadowOffsetX() {
    return this._opt.shadowOffsetX;
  }

  /**
   * @description Set shadowOffsetX
   * @type {Number}
   * @member Shape#shadowOffsetX
   */
  set shadowOffsetX(shadowOffsetX) {
    this._opt.shadowOffsetX = shadowOffsetX;
  }

  /**
   * @description Get shadowOffsetY
   * @type {Number}
   * @member Shape#shadowOffsetY
   */
  get shadowOffsetY() {
    return this._opt.shadowOffsetY;
  }

  /**
   * @description Set shadowOffsetY
   * @type {Number}
   * @member Shape#shadowOffsetY
   */
  set shadowOffsetY(shadowOffsetY) {
    this._opt.shadowOffsetY = shadowOffsetY;
  }

  /**
   * @description Get lineCap
   * @type {String}
   * @member Shape#lineCap
   */
  get lineCap() {
    return this._opt.lineCap;
  }

  /**
   * @description Set lineCap
   * @type {String}
   * @member Shape#lineCap
   */
  set lineCap(lineCap) {
    this._opt.lineCap = lineCap;
  }

  /**
   * @description Get lineJoin
   * @type {String}
   * @member Shape#lineJoin
   */
  get lineJoin() {
    return this._opt.lineJoin;
  }

  /**
   * @description Set lineJoin
   * @type {String}
   * @member Shape#lineJoin
   */
  set lineJoin(lineJoin) {
    this._opt.lineJoin = lineJoin;
  }

  /**
   * @description Get lineWidth
   * @type {Number}
   * @member Shape#lineWidth
   */
  get lineWidth() {
    return this._opt.lineWidth;
  }

  /**
   * @description Set lineWidth
   * @type {Number}
   * @member Shape#lineWidth
   */
  set lineWidth(lineWidth) {
    this._opt.lineWidth = lineWidth;
  }

  /**
   * @description Get miterLimit
   * @type {Number}
   * @member Shape#miterLimit
   */
  get miterLimit() {
    return this._opt.miterLimit;
  }

  /**
   * @description Set miterLimit
   * @type {Number}
   * @member Shape#miterLimit
   */
  set miterLimit(miterLimit) {
    this._opt.miterLimit = miterLimit;
  }

  /**
   * @description Get globalAlpha
   * @type {Number}
   * @member Shape#globalAlpha
   */
  get globalAlpha() {
    return this._opt.globalAlpha;
  }

  /**
   * @description Set globalAlpha
   * @type {Number}
   * @member Shape#globalAlpha
   */
  set globalAlpha(globalAlpha) {
    this._opt.globalAlpha = globalAlpha;
  }

  /**
   * @description Get globalCompositeOperation
   * @type {String}
   * @member Shape#globalCompositeOperation
   */
  get globalCompositeOperation() {
    return this._opt.globalCompositeOperation;
  }

  /**
   * @description Set globalCompositeOperation
   * @type {String}
   * @member Shape#globalCompositeOperation
   */
  set globalCompositeOperation(globalCompositeOperation) {
    this._opt.globalCompositeOperation = globalCompositeOperation;
  }

  /**
   * @description Get x
   * @type {Number}
   * @member Shape#x
   */
  get x() {
    return this._opt.x;
  }

  /**
   * @description Set x
   * @type {Number}
   * @member Shape#x
   */
  set x(x) {
    this._opt.x = x;
    this._position = new Point([this._opt.x, this._opt.y]);
  }

  /**
   * @description Get y
   * @type {Number}
   * @member Shape#y
   */
  get y() {
    return this._opt.y;
  }

  /**
   * @description Set y
   * @type {Number}
   * @member Shape#y
   */
  set y(y) {
    this._opt.y = y;
    this._position = new Point([this._opt.x, this._opt.y]);
  }

  /**
   * @description Get position
   * @type {Point}
   * @member Shape#position
   */
  get position() {
    return new Point(this._position);
  }

  /**
   * @description Set position
   * @type {Point}
   * @member Shape#position
   */
  set position(position) {
    if (!(position instanceof Point)) {
      throw new TypeError("Input position is not Point.");
    }
    this._opt.x = position.x;
    this._opt.y = position.y;
    this._position = new Point(position);
  }

  /**
   * @description Get visible
   * @type {Boolean}
   * @member Shape#visible
   */
  get visible() {
    return this._opt.visible;
  }

  /**
   * @description Set visible
   * @type {Boolean}
   * @member Shape#visible
   */
  set visible(visible) {
    this._opt.visible = visible;
  }

  /**
   * @description scale
   * @param {Number} xScale xScale
   * @param {Number} yScale yScale
   * @member Shape#scale
   */
  scale(xScale, yScale) {
    this._cs.scale(xScale, yScale);
  }

  /**
   * @description rotate
   * @param {Number} radian radian
   * @member Shape#rotate
   */
  rotate(radian) {
    this._cs.rotate(radian);
  }

  /**
   * @description translate
   * @param {Number} x position x
   * @param {Number} y position y
   * @member Shape#translate
   */
  translate(x, y) {
    this._cs.translate(new Point([x, y]));
  }

  /**
   * @description get option
   * @param {String} name property name
   * @return {Object} option
   * @member Shape#getOption
   */
  getOption(name) {
    let hasName = name !== undefined && name !== null;
    if (!hasName) {
      return null;
    }

    if (cs_options.includes(name)) {
      return this._cs.getOption(name);
    }
    return this._opt[name];
  }

  /**
   * @description set option
   * @param {String} name property name
   * @param {Object} value property value
   * @member Shape#setOption
   */
  setOption(name, value) {
    let hasName = name !== undefined && name !== null;
    let hasValue = value !== undefined && value !== null;

    if (!hasName || !hasValue) {
      return;
    }

    if (cs_options.includes(name)) {
      this._cs.setOption(name, value);
      return;
    }
    this._opt[name] = value;
  }

  /**
   * @description get options
   * @return {Object} options
   * @member Shape#getOptions
   */
  getOptions() {
    let options = Object.assign({}, this._opt);
    _.each(cs_options, key => {
      options[key] = this._cs._opt[key];
    });
    return options;
  }

  /**
   * @description set options
   * @param {Object} options options
   * @member Shape#setOptions
   */
  setOptions(options = {}) {
    options = Object.assign({}, options);

    _.each(options, (value, key) => {
      if (!cs_options.includes(key)) {
        return;
      }
      this._cs.setOption(key, value);
      delete options[key];
    });
    Object.assign(this._opt, options);
  }

  /**
   * @description render
   * @member Shape#render
   */
  render() {
    throw new ExtendingError("The render isn't overridden. It need to be overridden.");
  }

  /**
   * @description validate Sketchbook
   * @param {Sketchbook} sketchbook Shape
   * @member Shape#validateSketchbook
   */
  validateSketchbook(sketchbook) {
    if (sketchbook && !(sketchbook instanceof Sketchbook)) {
      throw new TypeError("Input wrong parameter.(Different class)");
    }
  }

  /**
   * @description apply options
   * @param {Sketchbook} sketchbook Shape
   * @member Shape#applyOptions
   */
  applyOptions(sketchbook) {
    this.validateSketchbook(sketchbook);
    _.each(this._defaultCanvasOpt, (value, key) => {
      sketchbook._context[key] = this._opt[key];
    });
  }

  /**
   * @description reset options
   * @param {Sketchbook} sketchbook Shape
   * @member Shape#resetOptions
   */
  resetOptions(sketchbook) {
    this.validateSketchbook(sketchbook);
    _.each(this._defaultCanvasOpt, (value, key) => {
      sketchbook._context[key] = value;
    });
  }
}

export default Shape;
