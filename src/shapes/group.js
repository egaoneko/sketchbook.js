import _ from "lodash";
import Shape from "./shape";
import {typeCheck} from "../utils/base";
import {CannotFoundError, ArgumentError} from "../errors/errors";

/**
 * @description Group Class
 * @class Group
 */
class Group extends Shape {

  /**
   * @description Group constructor.
   * @constructs Group
   */
  constructor(options = {}) {
    super(options);
    this._objects = [];
  }

  /**
   * @description scale
   * @param {Number} xScale xScale
   * @param {Number} yScale yScale
   * @param {Point} [pivot] pivot point
   * @member Group#scale
   */
  scale(xScale, yScale, pivot) {
    _.each(this._objects, renderObj=> {
      if (!('render' in renderObj)) {
        return;
      }
      renderObj.scale(xScale, yScale, pivot);
    });
  }

  /**
   * @description rotate
   * @param {Number} radian radian
   * @param {Point} [pivot] pivot point
   * @member Group#rotate
   */
  rotate(radian, pivot) {
    _.each(this._objects, renderObj=> {
      if (!('render' in renderObj)) {
        return;
      }
      renderObj.rotate(radian, pivot);
    });
  }

  /**
   * @description translate
   * @param {Number} x position x
   * @param {Number} y position y
   * @member Group#translate
   */
  translate(x, y) {
    _.each(this._objects, renderObj=> {
      if (!('render' in renderObj)) {
        return;
      }
      renderObj.translate(x, y);
    });
  }

  /**
   * @description add Objects
   * @param {Array|Shape} shapes added Shapes
   * @member Group#add
   */
  add(shapes) {
    if (!shapes) {
      throw new CannotFoundError("Cannot found shapes.");
    }

    if (!typeCheck('array', shapes)) {
      this._add(shapes);
      return;
    }

    _.each(shapes, object => {
      this._add(object);
    });
  }

  /**
   * @private
   * @description add Objects
   * @param {Shape} shape added shape
   * @method _add
   */
  _add(shape) {
    if (!(shape instanceof Shape)) {
      throw new ArgumentError("This object isn't a instance of Shape.");
    }
    this._objects.push(shape);
  }


  /**
   * @description renderShape
   * @param {Sketchbook} sketchbook Sketchbook
   * @member Group#renderShape
   */
  renderShape(sketchbook) {
    if (!this.visible) {
      return;
    }

    this._render(sketchbook);
  }

  /**
   * @private
   * @description render
   * @param {Sketchbook} sketchbook Sketchbook
   * @method _render
   */
  _render(sketchbook) {
    this._renderChild(sketchbook);
  }

  /**
   * @private
   * @description render children
   * @param {Sketchbook} sketchbook Sketchbook
   * @method _renderChild
   */
  _renderChild(sketchbook) {
    _.each(this._objects, renderObj=> {
      if (!('render' in renderObj)) {
        return;
      }
      renderObj.renderShape(sketchbook);
    });
  }
}

export default Group;
