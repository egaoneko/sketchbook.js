import _ from "lodash";
import {typeCheck} from "../utils/base";
import Shape from "./shape";
import Point from "../objects/point";
import BoundingBoxHelper from "../helpers/bounding_box_helper";
import {GEOMETRY_TYPE} from "../enums/global";

/**
 * @description Geometry Class
 * @class Geometry
 */
class Geometry extends Shape {

  /**
   * @description Geometry constructor.
   * @constructs Geometry
   */
  constructor (corners, options = {}) {
    super(options);
    this._corners = [];
    this._boundingBoxHelper = new BoundingBoxHelper();
    this._init(corners, options);
    // TODO bound box, example
  }

  /**
   * @private
   * @description Init
   * @param {Array} corners corners
   * @param {Object} options options
   * @method _init
   */
  _init (corners, options = {}) {
    this._initCorners(corners);
    if (!('geometryType' in options)) {
      this._opt['geometryType'] = GEOMETRY_TYPE.POLYGON;
    }
  }

  /**
   * @private
   * @description Init corners
   * @param {Array} corners corners
   * @method _initCorners
   */
  _initCorners (corners) {
    this._corners = [];
    this._boundingBoxHelper.clear();
    if (!typeCheck('array', corners)) {
      throw new TypeError("Corners must be an array.");
    }

    _.each(corners, corner => {
      if (typeCheck('array', corner)) {
        this._addArrayCorner(corner);
        return;
      }

      if (corner instanceof Point) {
        this._addPointCorner(corner);
        return;
      }
      throw new TypeError("Add wrong corner type.");
    });
    this.position = this._boundingBoxHelper.center;
  }

  _addArrayCorner (corner) {
    if (corner.length !== 2) {
      throw new TypeError("Corner must be a 2D.");
    }
    this._addPointCorner(new Point(corner));
  }

  _addPointCorner (corner) {
    let cornerPoint = new Point(corner);
    this._corners.push(cornerPoint);
    this._boundingBoxHelper.add(cornerPoint);
  }

  /**
   * @description Get corners
   * @type {Array}
   * @member Geometry#corners
   */
  get corners () {
    let corners = [];
    _.each(this._corners, corner => {
      corners.push(new Point(corner));
    });
    return corners;
  }

  /**
   * @description Set corners
   * @type {Array}
   * @member Geometry#corners
   */
  set corners (corners) {
    this._initCorners(corners);
  }

  /**
   * @description render
   * @param {Sketchbook} sketchbook Sketchbook
   * @member Geometry#render
   */
  render (sketchbook) {
    let ctx = sketchbook.context;

    let convertedCorners = _.map(this._corners, corner=> {
      return sketchbook.convertPositionFromLocalCSToScreen(corner);
    });

    ctx.beginPath();
    _.each(convertedCorners, (corner, index) => {
      if (index === 0) {
        ctx.moveTo(corner.x, corner.y);
      }
      ctx.lineTo(corner.x, corner.y);
    });

    if (this._opt.geometryType === GEOMETRY_TYPE.POLYGON) {
      ctx.closePath();
    }

    if (this._opt.isStroked) {
      ctx.stroke();
    }
  }
}

export default Geometry;
