import Shape from "./shape";

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

    if (!('sAngle' in options)) {
      this._opt['sAngle'] = 0;
    }

    if (!('eAngle' in options)) {
      this._opt['eAngle'] = 0;
    }

    if (!('counterclockwise' in options)) {
      this._opt['counterclockwise'] = false;
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
   * @description Get sAngle
   * @type {Number}
   * @member Circle#sAngle
   */
  get sAngle () {
    return this._opt.sAngle;
  }

  /**
   * @description Set sAngle
   * @type {Number}
   * @member Circle#sAngle
   */
  set sAngle (sAngle) {
    this._opt.sAngle = sAngle;
  }

  /**
   * @description Get eAngle
   * @type {Number}
   * @member Circle#eAngle
   */
  get eAngle () {
    return this._opt.eAngle;
  }

  /**
   * @description Set eAngle
   * @type {Number}
   * @member Circle#eAngle
   */
  set eAngle (eAngle) {
    this._opt.eAngle = eAngle;
  }

  /**
   * @description Get counterclockwise
   * @type {Boolean}
   * @member Circle#counterclockwise
   */
  get counterclockwise () {
    return this._opt.counterclockwise;
  }

  /**
   * @description Set counterclockwise
   * @type {Boolean}
   * @member Circle#counterclockwise
   */
  set counterclockwise (counterclockwise) {
    this._opt.counterclockwise = counterclockwise;
  }

  /**
   * @description render
   * @param {Sketchbook} sketchbook Sketchbook
   * @member Circle#render
   */
  render (sketchbook) {
    let ctx = sketchbook.context;
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, this.sAngle * Math.PI, this.eAngle * Math.PI, this.counterclockwise);

    if (this._opt.isStroked) {
      ctx.stroke();
    }

    if (this._opt.isFilled) {
      ctx.fill();
    }
  }
}

export default Circle;
