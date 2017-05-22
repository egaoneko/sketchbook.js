import _ from "lodash";
import {typeCheck} from "../utils/base";
import Shape from "./shape";
import Point from "../objects/point";
import {GEOMETRY_TYPE} from "../global/global";
import {ArgumentError} from "../errors/errors";

/**
 * @description Geometry Class
 * @class Geometry
 */
class Geometry extends Shape {

  /**
   * @description Geometry constructor.
   * @constructs Geometry
   */
  constructor(corners, edges, options = {}) {
    super(options);
    this._corners = [];
    this._edges = [];
    this._init(corners, edges);
    // TODO bound box, example
  }

  /**
   * @private
   * @description Init
   * @param {Array} corners corners
   * @param {Array} edges edges
   * @param {Object} options options
   * @method _init
   */
  _init(corners, edges, options = {}) {
    this._initCorners(corners);
    this._initEdges(edges);
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
  _initCorners(corners) {
    this._corners = [];
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
  }

  _addArrayCorner(corner) {
    if (corner.length !== 2) {
      throw new TypeError("Corner must be a 2D.");
    }
    this._corners.push(new Point(corner));
  }

  _addPointCorner(corner) {
    this._corners.push(new Point(corner));
  }

  /**
   * @private
   * @description Init edges
   * @param {Array} edges edges
   * @method _initEdges
   */
  _initEdges(edges) {
    this._edges = [];
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

      this._edges.push(edge.slice());
    });
  }

  /**
   * @description Get corners
   * @type {Array}
   * @member Geometry#corners
   */
  get corners() {
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
  set corners(corners) {
    this._initCorners(corners);
  }

  /**
   * @description Get edges
   * @type {Array}
   * @member Geometry#edges
   */
  get edges() {
    let edges = [];
    _.each(this._edges, edge => {
      edges.push(edge.slice());
    });
    return edges;
  }

  /**
   * @description Set edges
   * @type {Array}
   * @member Geometry#edges
   */
  set edges(edges) {
    this._initEdges(edges);
  }

  /**
   * @description render
   * @param {Sketchbook} sketchbook Sketchbook
   * @member Geometry#render
   */
  render(sketchbook) {

  }
}

export default Geometry;
