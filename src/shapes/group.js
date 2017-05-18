import Shape from "./shape";
import GroupHelper from "../helper/group_helper";
import {ArgumentError} from "../errors/errors";

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
    this._groupHelper = new GroupHelper();
    this._groupHelper.distinct = true;
    this._groupHelper.validator = shape => {
      if (!(shape instanceof Shape)) {
        throw new ArgumentError("This object isn't a instance of Shape.");
      }
    };
  }

  /**
   * @description scale
   * @param {Number} xScale xScale
   * @param {Number} yScale yScale
   * @param {Point} [pivot] pivot point
   * @member Group#scale
   */
  scale(xScale, yScale, pivot) {
    this._groupHelper.iterate(renderObj => {
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
    this._groupHelper.iterate(renderObj => {
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
    this._groupHelper.iterate(renderObj => {
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
    this._groupHelper.add(shapes);
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
    this._groupHelper.iterate(renderObj => {
      if (!('render' in renderObj)) {
        return;
      }
      renderObj.renderShape(sketchbook);
    });
  }
}

export default Group;
