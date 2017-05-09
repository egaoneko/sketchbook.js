import Shape from "./shape";
import Point from "../objects/point";

/**
 * @description Line Class
 * @class Line
 */
class Line extends Shape {

  /**
   * @description Line constructor.
   * @constructs Line
   */
  constructor(options = {}) {
    super(options);
    this._init(options);
  }

  /**
   * @private
   * @description Init
   * @return {Object} options
   * @method _init
   */
  _init(options = {}) {
    if (!('x1' in options)) {
      this._opt['x1'] = 0;
    }
    if (!('y1' in options)) {
      this._opt['y1'] = 0;
    }
    if (!('x2' in options)) {
      this._opt['x2'] = 0;
    }
    if (!('y2' in options)) {
      this._opt['y2'] = 0;
    }
    this.x = (this._opt['x1'] + this._opt['x2']) * 0.5;
    this.y = (this._opt['y1'] + this._opt['y2']) * 0.5;
  }

  /**
   * @description Get x1
   * @type {Number}
   * @member Line#x1
   */
  get x1() {
    return this._opt.x1;
  }

  /**
   * @description Set x1
   * @type {Number}
   * @member Line#x1
   */
  set x1(x1) {
    this._opt.x1 = x1;
    this.x = (this._opt.x1 + this._opt.x2) * 0.5;
  }

  /**
   * @description Get y1
   * @type {Number}
   * @member Line#y1
   */
  get y1() {
    return this._opt.y1;
  }

  /**
   * @description Set y1
   * @type {Number}
   * @member Line#y1
   */
  set y1(y1) {
    this._opt.y1 = y1;
    this.y = (this._opt.y1 + this._opt.y2) * 0.5;
  }

  /**
   * @description Get x2
   * @type {Number}
   * @member Line#x2
   */
  get x2() {
    return this._opt.x2;
  }

  /**
   * @description Set x2
   * @type {Number}
   * @member Line#x2
   */
  set x2(x2) {
    this._opt.x2 = x2;
    this.x = (this._opt.x1 + this._opt.x2) * 0.5;
  }

  /**
   * @description Get y2
   * @type {Number}
   * @member Line#y2
   */
  get y2() {
    return this._opt.y2;
  }

  /**
   * @description Set y2
   * @type {Number}
   * @member Line#y2
   */
  set y2(y2) {
    this._opt.y2 = y2;
    this.y = (this._opt.y1 + this._opt.y2) * 0.5;
  }

  /**
   * @description render
   * @param {Sketchbook} sketchbook Sketchbook
   * @member Line#render
   */
  render(sketchbook) {
    let ctx = sketchbook.context;
    let start = sketchbook.convertPositionFromLocalCSToScreen(new Point([this.x1, this.y1]));
    let end = sketchbook.convertPositionFromLocalCSToScreen(new Point([this.x2, this.y2]));

    let x1 = start.x;
    let y1 = start.y;
    let x2 = end.x;
    let y2 = end.y;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    if (this._opt.isStroked) {
      ctx.stroke();
    }
  }
}

export default Line;
