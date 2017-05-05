import _ from "lodash";
import Shape from "./shape";
import Point from "../objects/point";
import {ORIGIN} from "../global/global";

const rect_options = ["width", "height", "origin"];

/**
 * @description Rect Class
 * @class Rect
 */
class Rect extends Shape {

  /**
   * @description Rect constructor.
   * @constructs Rect
   */
  constructor(options = {}) {
    super(options);
    this._init(options);
  }

  /**
   * @description Init
   * @return {Object} options
   * @method _init
   */
  _init(options = {}) {
    _.each(rect_options, key => {
      if (!(key in options)) {
        return;
      }
      this._opt[key] = options[key];
    });

    if (!('origin' in options)) {
      this._opt['origin'] = ORIGIN.LEFT_TOP;
    }
  }

  /**
   * @description Get width
   * @type {Number}
   * @member Rect#width
   */
  get width() {
    return this._opt.width;
  }

  /**
   * @description Set width
   * @type {Number}
   * @member Rect#width
   */
  set width(width) {
    this._opt.width = width;
  }

  /**
   * @description Get height
   * @type {Number}
   * @member Rect#height
   */
  get height() {
    return this._opt.height;
  }

  /**
   * @description Set height
   * @type {Number}
   * @member Rect#height
   */
  set height(height) {
    this._opt.height = height;
  }

  /**
   * @description get option
   * @param {String} name property name
   * @return {Object} option
   * @member Rect#getOption
   */
  getOption(name) {
    let hasName = name !== undefined && name !== null;
    if (!hasName) {
      return null;
    }

    if (rect_options.includes(name)) {
      return this._opt[name];
    }
    super.getOption(name);
  }

  /**
   * @description set option
   * @param {String} name property name
   * @param {Object} value property value
   * @member Rect#setOption
   */
  setOption(name, value) {
    let hasName = name !== undefined && name !== null;
    let hasValue = value !== undefined && value !== null;

    if (!hasName || !hasValue) {
      return;
    }

    if (rect_options.includes(name)) {
      this._opt[name] = value;
      return;
    }
    super.setOption(name, value);
  }

  /**
   * @description get options
   * @return {Object} options
   * @member Rect#getOptions
   */
  getOptions() {
    let options = super.getOptions();
    _.each(rect_options, key => {
      options[key] = this._opt[key];
    });
    return options;
  }

  /**
   * @description set options
   * @param {Object} options options
   * @member Rect#setOptions
   */
  setOptions(options = {}) {
    super.setOptions(options);

    _.each(options, (value, key) => {
      if (!rect_options.includes(key)) {
        return;
      }
      this._opt[key] = value;
    });
  }

  /**
   * @description render
   * @param {Sketchbook} sketchbook Sketchbook
   * @member Rect#render
   */
  render(sketchbook) {
    this.validateSketchbook(sketchbook);
    let origin = this._getOrigin();
    let ctx = sketchbook._context;
    let basis = sketchbook._cs.basis;

    let x = origin.x;
    let y = origin.y;
    let w = this._opt.width;
    let h = this._opt.height;

    this.applyOptions(sketchbook);
    ctx.setTransform(basis.a, basis.b, basis.c, basis.d, basis.e, basis.f);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + h);
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x + w, y);
    ctx.lineTo(x, y);
    ctx.stroke();
    this.resetOptions(sketchbook);
    // TODO : visible, fill, stroke
  }

  /**
   * @description get origin
   * @return {Point} position
   * @method _getOrigin
   */
  _getOrigin() {
    if (this._opt.origin === ORIGIN.CENTER) {
      let x = this._position.x - this._opt.width * 0.5;
      let y = this._position.y - this._opt.height * 0.5;
      return new Point([x, y]);
    }
    return new Point(this._position);
  }
}

export default Rect;
