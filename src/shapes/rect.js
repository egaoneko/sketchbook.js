import Shape from "./shape";
import Point from "../objects/point";
import {ORIGIN} from "../enums/global";

/**
 * @description Rect Class
 * @class Rect
 */
class Rect extends Shape {

  /**
   * @description Rect constructor.
   * @constructs Rect
   */
  constructor (options = {}) {
    super(options);
    this._init(options);
  }

  /**
   * @private
   * @description Init
   * @param {Object} options options
   * @method _init
   */
  _init (options = {}) {
    if (!('width' in options)) {
      this._opt['width'] = 0;
    }
    if (!('height' in options)) {
      this._opt['height'] = 0;
    }
    if (!('origin' in options)) {
      this._opt['origin'] = ORIGIN.LEFT_TOP;
    }
  }

  /**
   * @description Get width
   * @type {Number}
   * @member Rect#width
   */
  get width () {
    return this._opt.width;
  }

  /**
   * @description Set width
   * @type {Number}
   * @member Rect#width
   */
  set width (width) {
    this._opt.width = width;
  }

  /**
   * @description Get height
   * @type {Number}
   * @member Rect#height
   */
  get height () {
    return this._opt.height;
  }

  /**
   * @description Set height
   * @type {Number}
   * @member Rect#height
   */
  set height (height) {
    this._opt.height = height;
  }

  /**
   * @description render
   * @param {Sketchbook} sketchbook Sketchbook
   * @member Rect#render
   */
  render (sketchbook) {
    let origin = this._getOrigin();
    let ctx = sketchbook.context;

    let x = origin.x;
    let y = origin.y;
    let w = this.width;
    let h = this.height;

    let p1 = sketchbook.convertPositionFromLocalCSToScreen(new Point([x, y]));
    let p2 = sketchbook.convertPositionFromLocalCSToScreen(new Point([x, y + h]));
    let p3 = sketchbook.convertPositionFromLocalCSToScreen(new Point([x + w, y + h]));
    let p4 = sketchbook.convertPositionFromLocalCSToScreen(new Point([x + w, y]));

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.lineTo(p4.x, p4.y);
    ctx.lineTo(p1.x, p1.y);

    if (this._opt.isStroked) {
      ctx.stroke();
    }

    if (this._opt.isFilled) {
      ctx.fill();
    }
  }

  /**
   * @private
   * @description get origin
   * @return {Point} position
   * @method _getOrigin
   */
  _getOrigin () {
    if (this._opt.origin === ORIGIN.CENTER) {
      let x = this.x - this.width * 0.5;
      let y = this.y - this.height * 0.5;
      return new Point([x, y]);
    }
    return new Point(this._position);
  }
}

export default Rect;
