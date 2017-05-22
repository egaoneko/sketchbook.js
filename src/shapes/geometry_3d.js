import _ from "lodash";
import {Vector} from "sylvester-es6";
import {typeCheck} from "../utils/base";
import Shape from "./shape";
import Point from "../objects/point";
import {ArgumentError} from "../errors/errors";

/**
 * @description Geometry3D Class
 * @class Geometry3D
 */
class Geometry3D extends Shape {

  /**
   * @description Geometry3D constructor.
   * @constructs Geometry3D
   */
  constructor(corners, edges, camera, options = {}) {
    super(options);
    this._corners = [];
    this._edges = [];
    this._camera = null;
    this._init(corners, edges, camera);
  }

  /**
   * @private
   * @description Init
   * @param {Array} corners corners
   * @param {Array} edges edges
   * @param {Object} camera camera
   * @method _init
   */
  _init(corners, edges, camera) {
    this._initCorners(corners);
    this._initEdges(edges);
    this._initCamera(camera);
  }

  /**
   * @private
   * @description Init corners
   * @param {Array} corners corners
   * @method _initCorners
   */
  _initCorners(corners) {
    if (!typeCheck('array', corners)) {
      throw new TypeError("Corners must be an array.");
    }

    _.each(corners, corner => {
      if (!typeCheck('array', corner)) {
        throw new TypeError("Corner must be an array.");
      }

      if (corner.length !== 3) {
        throw new TypeError("Corner must be a 3D.");
      }

      this._corners.push(new Vector(corner));
    });
  }

  /**
   * @private
   * @description Init edges
   * @param {Array} edges edges
   * @method _initEdges
   */
  _initEdges(edges) {
    if (!typeCheck('array', edges)) {
      throw new TypeError("Edges must be an array.");
    }

    _.each(edges, edge => {
      if (!typeCheck('array', edge)) {
        throw new TypeError("Edge must be an array.");
      }

      if (edge.length !== 2) {
        throw new ArgumentError("Edge must be a 2D.");
      }

      this._edges.push(new Vector(edge));
    });
  }

  /**
   * @private
   * @description Init camera
   * @param {Object} camera camera
   * @method _initCamera
   */
  _initCamera(camera) {
    if (!typeCheck('array', camera)) {
      throw new TypeError("Camera must be an array.");
    }

    if (camera.length !== 3) {
      throw new ArgumentError("Camera must be a 3D.");
    }
    this._camera = new Vector(camera);
  }

  /**
   * @description Set corners
   * @type {Array}
   * @member Geometry3D#corners
   */
  set corners(corners) {
    this._corners = [];
    this._initCorners(corners);
  }

  /**
   * @description Set edges
   * @type {Array}
   * @member Geometry3D#edges
   */
  set edges(edges) {
    this._edges = [];
    this._initEdges(edges);
  }

  /**
   * @description Set camera
   * @type {Array}
   * @member Geometry3D#camera
   */
  set camera(camera) {
    this._initCamera(camera);
  }

  /**
   * @description render
   * @param {Sketchbook} sketchbook Sketchbook
   * @member Geometry3D#render
   */
  render(sketchbook) {
    let ctx = sketchbook.context;
    let halfWidth = sketchbook.width * 0.5;
    let halfHeight = sketchbook.height * 0.5;

    // Projection
    let shfitedCorners = _.map(this._corners, corner => {
      return corner.add(this._camera);
    });

    let inCameraPlane = _.map(shfitedCorners, corner => {
      return this._cornerScaleDown(corner);
    });

    let pixels = _.map(inCameraPlane, corner => {
      return this._convertCorner2Pixel(corner);
    });

    let pixelsToPoints = _.map(pixels, pixel => {
      let x = pixel.e(1) * halfWidth;
      let y = pixel.e(2) * halfHeight;
      return sketchbook.convertPositionFromLocalCSToScreen(new Point([x, y]));
    });

    ctx.beginPath();

    _.each(this._edges, edge => {
      let start = pixelsToPoints[edge.e(1)];
      let end = pixelsToPoints[edge.e(2)];
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      if (this._opt.isStroked) {
        ctx.stroke();
      }
    });
  }

  /**
   * @private
   * @description scale down
   * @param {Vector} corner corner
   * @method _cornerScaleDown
   */
  _cornerScaleDown(corner) {
    let x = corner.e(1);
    let y = corner.e(2);
    let z = corner.e(3);
    return new Vector([x / z, y / z, 1]);
  }

  /**
   * @private
   * @description get pixel
   * @param {Vector} corner corner
   * @return {Vector} pixel
   * @method _convertCorner2Pixel
   */
  _convertCorner2Pixel(corner) {
    let x = corner.e(1);
    let y = corner.e(2);
    return new Vector([x, y]);
  }
}

export default Geometry3D;
