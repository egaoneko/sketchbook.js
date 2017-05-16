import Shape from "./shape";
import Point from "../objects/point";

/**
 * @description Circle Class
 * @class Circle
 */
class Circle extends Shape {

  /**
   * @description Circle constructor.
   * @constructs Circle
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
    if (!('radius' in options)) {
      this._opt['radius'] = 0;
    }
  }

  /**
   * @description Get radius
   * @type {Number}
   * @member Circle#radius
   */
  get radius () {
    return this._opt.radius;
  }

  /**
   * @description Set radius
   * @type {Number}
   * @member Circle#radius
   */
  set radius (radius) {
    this._opt.radius = radius;
  }

  /**
   * @description render
   * @param {Sketchbook} sketchbook Sketchbook
   * @member Circle#render
   */
  render (sketchbook) {
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

export default Circle;
