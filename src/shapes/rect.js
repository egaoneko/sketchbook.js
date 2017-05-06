import Shape from "./shape";
import Point from "../objects/point";
import {ORIGIN} from "../global/global";

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
   * @description render
   * @param {Sketchbook} sketchbook Sketchbook
   * @member Rect#render
   */
  render(sketchbook) {
    let origin = this._getOrigin();
    let ctx = sketchbook._context;

    let x = origin.x;
    let y = origin.y;
    let w = this._opt.width;
    let h = this._opt.height;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + h);
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x + w, y);
    ctx.lineTo(x, y);

    if (this._opt.isStroked) {
      ctx.stroke();
    }

    if (this._opt.isFilled) {
      ctx.fill();
    }
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
