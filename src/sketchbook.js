import Shape from "./shapes/shape";
import Point from "./objects/point";
import GroupHelper from "./helpers/group_helper";
import SketchbookMouseEventHelper from "./helpers/sketchbook_mouse_event_helper";
import {typeCheck} from "./utils/base";
import {CannotFoundError, ArgumentError} from "./errors/errors";
import {ORIGIN, COORDINATE_SYSTEM} from "./enums/global";

/**
 * @description Sketchbook Class
 * @class Sketchbook
 */
class Sketchbook extends Shape {

  /**
   * @description Sketchbook constructor.
   * @constructs Sketchbook
   */
  constructor (param) {
    super();
    let canvas = null;

    // If param is canvas element
    let isTypeObject = typeCheck('object', param);
    if (isTypeObject) {
      canvas = Sketchbook._getCanvasByElement(param);
    }

    // If param is canvas id
    let isTypeString = typeCheck('string', param);
    if (isTypeString) {
      canvas = Sketchbook._getCanvasById(param);
    }

    if (canvas === null) {
      canvas = document.createElement('canvas');
    }
    this._canvas = canvas;
    this._context = canvas.getContext('2d');
    this._groupHelper = new GroupHelper();
    this._groupHelper.distinct = true;
    this._groupHelper.validator = shape => {
      if (!(shape instanceof Shape)) {
        throw new ArgumentError("This object isn't a instance of Shape.");
      }
    };
    this._sketchbookMouseEventHelper = new SketchbookMouseEventHelper(this);
    this._init();
  }

  /**
   * @private
   * @description Init
   * @method _init
   */
  _init () {
    this._opt['origin'] = ORIGIN.LEFT_TOP;
    this._opt['coordinateSystem'] = COORDINATE_SYSTEM.SCREEN;
  }

  /**
   * @private
   * @description Get canvas by element/
   * @param {Object} canvas canvas element
   * @method _getCanvasByElement
   */
  static _getCanvasByElement (canvas) {
    let isCanvas = canvas.nodeName && canvas.nodeName === 'CANVAS';

    if (!isCanvas) {
      throw new TypeError("Input element is not canvas.");
    }
    return canvas;
  }

  /**
   * @private
   * @description Get canvas by element/
   * @param {String} id canvas id
   * @method _setCanvasById
   */
  static _getCanvasById (id) {
    let canvas = document.getElementById(id);

    if (typeCheck('null', canvas)) {
      throw new CannotFoundError("Cannot found element by id.");
    }
    return canvas;
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
   * @description Get canvas context
   * @type {Object}
   * @member Sketchbook#context
   */
  get context () {
    return this._context;
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
   * @description translate
   * @param {Number} x position x
   * @param {Number} y position y
   * @member Sketchbook#translate
   */
  translate (x, y) {
    [x, y] = this._convertPositionOfCS(x, y);
    super.translate(x, y);
  }

  /**
   * @description setTranslate
   * @param {Number} x position x
   * @param {Number} y position y
   * @member Sketchbook#setTranslate
   */
  setTranslate (x, y) {
    [x, y] = this._convertPositionOfCS(x, y);
    super.setTranslate(x, y);
  }

  /**
   * @private
   * @description convert position of coordinate system
   * @param {Number} x position x
   * @param {Number} y position y
   * @return {Array} converted position
   * @method _add
   */
  _convertPositionOfCS (x, y) {
    if (this._opt.coordinateSystem === COORDINATE_SYSTEM.CARTESIAN) {
      return [x, -y];
    }
    return [x, y];
  }

  /**
   * @description add Objects
   * @param {Array|Shape} shapes added Shapes
   * @member Sketchbook#add
   */
  add (shapes) {
    this._groupHelper.add(shapes);
  }

  /**
   * @description renderAll
   * @member Sketchbook#renderAll
   */
  renderAll () {
    this._renderChild();
  }

  /**
   * @private
   * @description render children
   * @method _renderChild
   */
  _renderChild () {
    this._groupHelper.iterate(renderObj=> {
      if (!('render' in renderObj)) {
        return;
      }
      renderObj.renderShape(this);
    });
  }

  /**
   * @description before render
   * @param {Sketchbook} sketchbook Sketchbook
   * @member Shape#beforeRender
   */
  beforeRender (sketchbook) {
    let ctx = sketchbook.context;
    let basis = sketchbook._cs.basis;
    ctx.setTransform(basis.a, basis.b, basis.c, basis.d, basis.e, basis.f);
    this.applyOptions(sketchbook);
  }

  /**
   * @description render
   * @param {Sketchbook} sketchbook Sketchbook
   * @member Sketchbook#render
   */
  render (sketchbook) {
    let origin = sketchbook.convertPositionFromLocalCSToScreen(this._getOrigin());
    sketchbook._context.drawImage(this._canvas, origin.x, origin.y);
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

  /**
   * @description clear Sketchbook
   * @member Sketchbook#clearContext
   */
  clear () {
    this._context.save();
    this._context.setTransform(1, 0, 0, 1, 0, 0);
    this._context.clearRect(0, 0, this.width, this.height);
    this._context.restore();
  }

  /**
   * @description convert position to screen
   * @param {Point} position position to convert
   * @return {Point} converted position
   * @member Sketchbook#convertPositionFromLocalCSToScreen
   */
  convertPositionFromLocalCSToScreen (position) {
    if (!(position instanceof Point)) {
      throw new TypeError("Input position is not Point.");
    }

    if (this._opt.coordinateSystem === COORDINATE_SYSTEM.CARTESIAN) {
      let x = position.x;
      let y = this.height - position.y;
      return new Point([x, y]);
    }
    return new Point(position);
  }

  /**
   * @description add event listener
   * @param {Event|String} type type
   * @param {Function} listener listener
   * @param {Boolean} [useCapture] capture boolean
   * @return {Function} listener
   * @member Sketchbook#addEventListener
   */
  addEventListener (type, listener, useCapture) {
    return this._sketchbookMouseEventHelper.addEventListener(type, listener, useCapture);
  }

  /**
   * @description remove event listener
   * @param {Event|String} type type
   * @param {Function} listener listener
   * @param {Boolean} [useCapture] capture boolean
   * @member Sketchbook#removeEventListener
   */
  removeEventListener (type, listener, useCapture) {
    this._sketchbookMouseEventHelper.removeEventListener(type, listener, useCapture);
  }
}

export default Sketchbook;
