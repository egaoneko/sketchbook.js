import _ from "lodash";
import uuidV4 from "uuid/v4";
import {typeCheck} from "../utils/base";
import Point from "../objects/point";
import CoordinateSystem from "../objects/coordinate_system";
import {ExtendingError, ArgumentError} from "../errors/errors";

const CS_OPTIONS = ["orientation"];

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
      globalCompositeOperation: 'source-over'
    };
    this._cs = new CoordinateSystem();
    this._opt = Object.assign({
      x: 0,
      y: 0,
      visible: true,
      isFilled: false,
      isStroked: true
    }, this._defaultCanvasOpt);

    this.setOptions(options);
    this._position = new Point([this._opt.x, this._opt.y]);
    this._uuid = uuidV4();
  }

  /**
   * @description Get fillStyle
   * @type {String|Function}
   * @member Shape#fillStyle
   */
  get fillStyle() {
    return this._opt.fillStyle;
  }

  /**
   * @description Set fillStyle
   * @type {String|Function}
   * @member Shape#fillStyle
   */
  set fillStyle(fillStyle) {
    this._opt.fillStyle = fillStyle;
  }

  /**
   * @description Get strokeStyle
   * @type {String|Function}
   * @member Shape#strokeStyle
   */
  get strokeStyle() {
    return this._opt.strokeStyle;
  }

  /**
   * @description Set strokeStyle
   * @type {String|Function}
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
   * @description Get xScale
   * @type {Number}
   * @member Shape#xScale
   */
  get xScale() {
    return this._cs._xScale;
  }

  /**
   * @description Get yScale
   * @type {Number}
   * @member Shape#yScale
   */
  get yScale() {
    return this._cs._yScale;
  }

  /**
   * @description Get radian
   * @type {Number}
   * @member Shape#radian
   */
  get radian() {
    return this._cs._radian;
  }

  /**
   * @description Get basis
   * @type {CanvasMatrix}
   * @member Shape#basis
   */
  get basis() {
    return this._cs.basis;
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
   * @description Get isFilled
   * @type {Boolean}
   * @member Shape#isFilled
   */
  get isFilled() {
    return this._opt.isFilled;
  }

  /**
   * @description Set isFilled
   * @type {Boolean}
   * @member Shape#isFilled
   */
  set isFilled(isFilled) {
    this._opt.isFilled = isFilled;
  }

  /**
   * @description Get isStroked
   * @type {Boolean}
   * @member Shape#isStroked
   */
  get isStroked() {
    return this._opt.isStroked;
  }

  /**
   * @description Set isStroked
   * @type {Boolean}
   * @member Shape#isStroked
   */
  set isStroked(isStroked) {
    this._opt.isStroked = isStroked;
  }

  /**
   * @description scale
   * @param {Number} xScale xScale
   * @param {Number} yScale yScale
   * @param {Point} [pivot] pivot point
   * @member Shape#scale
   */
  scale(xScale, yScale, pivot = this._position) {
    this._checkScaleValidate(xScale, yScale, pivot);

    this.translate(pivot.x, pivot.y);
    this._cs.scale(xScale, yScale);
    this.translate(-pivot.x, -pivot.y);
  }

  /**
   * @description setScale
   * @param {Number} xScale xScale
   * @param {Number} yScale yScale
   * @param {Point} [pivot] pivot point
   * @member Shape#setScale
   */
  setScale(xScale, yScale, pivot = this._position) {
    this._checkScaleValidate(xScale, yScale, pivot);

    this._cs.pivot = pivot;
    this._cs.setScale(xScale, yScale);
  }

  /**
   * @private
   * @description check scale validate
   * @param {Number} xScale xScale
   * @param {Number} yScale yScale
   * @param {Point} pivot point
   * @method isScaleValidate
   */
  _checkScaleValidate(xScale, yScale, pivot) {
    if (typeCheck('undefined', xScale) ||
      typeCheck('null', xScale) ||
      typeCheck('undefined', yScale) ||
      typeCheck('null', yScale)) {
      throw new ArgumentError("Both xScale and yScale must be needed.");
    }

    if (!typeCheck('number', xScale) || !typeCheck('number', yScale)) {
      throw new TypeError("Both xScale and yScale must be numerical values.");
    }

    if (xScale <= 0 || yScale <= 0) {
      throw new ArgumentError("Both xScale and yScale must be larger than 0.");
    }

    if (!(pivot instanceof Point)) {
      throw new TypeError("The pivot must be Point.");
    }
  }

  /**
   * @description rotate
   * @param {Number} radian radian
   * @param {Point} [pivot] pivot point
   * @member Shape#rotate
   */
  rotate(radian, pivot = this._position) {
    Shape._checkRotateValidate(radian, pivot);

    this.translate(pivot.x, pivot.y);
    this._cs.rotate(radian);
    this.translate(-pivot.x, -pivot.y);
  }

  /**
   * @description setRotate
   * @param {Number} radian radian
   * @param {Point} [pivot] pivot point
   * @member Shape#setRotate
   */
  setRotate(radian, pivot = this._position) {
    Shape._checkRotateValidate(radian, pivot);

    this._cs.pivot = pivot;
    this._cs.setRotate(radian);
  }

  /**
   * @private
   * @description check rotate validate
   * @param {Number} radian radian
   * @param {Point} pivot point
   * @method _checkRotateValidate
   */
  static _checkRotateValidate(radian, pivot) {
    if (typeCheck('undefined', radian) ||
      typeCheck('null', radian)) {
      throw new ArgumentError("A radian must be needed.");
    }

    if (!typeCheck('number', radian)) {
      throw new TypeError("A radian must be numerical values.");
    }

    if (!(pivot instanceof Point)) {
      throw new TypeError("The pivot must be Point.");
    }
  }

  /**
   * @description translate
   * @param {Number} x position x
   * @param {Number} y position y
   * @member Shape#translate
   */
  translate(x, y) {
    Shape._checkTranslateValidate(x, y);
    this._cs.translate(new Point([x, y]));
  }

  /**
   * @description setTranslate
   * @param {Number} x position x
   * @param {Number} y position y
   * @member Shape#setTranslate
   */
  setTranslate(x, y) {
    Shape._checkTranslateValidate(x, y);
    this._cs.setTranslate(new Point([x, y]));
  }

  /**
   * @private
   * @description check translate validate
   * @param {Number} x position x
   * @param {Number} y position y
   * @method _checkTranslateValidate
   */
  static _checkTranslateValidate(x, y) {
    if (typeCheck('undefined', x) ||
      typeCheck('null', x) ||
      typeCheck('undefined', y) ||
      typeCheck('null', y)) {
      throw new ArgumentError("Both x and y must be needed.");
    }

    if (!typeCheck('number', x) || !typeCheck('number', y)) {
      throw new TypeError("Both x and y must be numerical values.");
    }
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

    if (CS_OPTIONS.includes(name)) {
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

    if (CS_OPTIONS.includes(name)) {
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
    _.each(CS_OPTIONS, key => {
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
      if (!CS_OPTIONS.includes(key)) {
        return;
      }
      this._cs.setOption(key, value);
      delete options[key];
    });
    Object.assign(this._opt, options);
  }

  /**
   * @description renderShape
   * @param {Sketchbook} sketchbook Sketchbook
   * @member Shape#renderShape
   */
  renderShape(sketchbook) {
    if (!this.visible) {
      return;
    }

    this.beforeRender(sketchbook);
    this.render(sketchbook);
    this.afterRender(sketchbook);
  }

  /**
   * @description before render
   * @param {Sketchbook} sketchbook Sketchbook
   * @member Shape#beforeRender
   */
  beforeRender(sketchbook) {
    let ctx = sketchbook.context;
    let basis = sketchbook._cs.basis.multiply(this._cs.basis);
    ctx.setTransform(basis.a, basis.b, basis.c, basis.d, basis.e, basis.f);
    this.applyOptions(sketchbook);
  }

  /**
   * @description render
   * @member Shape#render
   */
  render() {
    throw new ExtendingError("The render isn't overridden. It need to be overridden.");
  }

  /**
   * @description after render
   * @param {Sketchbook} sketchbook Sketchbook
   * @member Shape#afterRender
   */
  afterRender(sketchbook) {
    this.resetOptions(sketchbook);
  }

  /**
   * @description apply options
   * @param {Sketchbook} sketchbook Shape
   * @member Shape#applyOptions
   */
  applyOptions(sketchbook) {
    _.each(this._defaultCanvasOpt, (value, key) => {
      value = this._opt[key];

      if (typeCheck('function', value)) {
        sketchbook.context[key] = value.call(this, sketchbook.context);
        return;
      }

      sketchbook.context[key] = this._opt[key];
    });
  }

  /**
   * @description reset options
   * @param {Sketchbook} sketchbook Shape
   * @member Shape#resetOptions
   */
  resetOptions(sketchbook) {
    _.each(this._defaultCanvasOpt, (value, key) => {
      sketchbook.context[key] = value;
    });
  }
}

export default Shape;
