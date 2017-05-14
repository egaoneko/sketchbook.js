import {Matrix as SylvesterMatrix} from "sylvester-es6";
import Point from "./point";

/**
 * @description Matrix Class
 * @class Matrix
 */

class Matrix extends SylvesterMatrix {
  /**
   * @description Multiply Matrix
   * @param {Matrix|Point} other object for multiply
   * @return {Matrix|Point} multiplied object
   * @member Matrix#multiply
   */
  multiply(other) {
    if (other instanceof Point) {
      let multipliedVector = super.multiply(other._vector);

      if (!multipliedVector) {
        return multipliedVector;
      }

      let x = multipliedVector.e(1);
      let y = multipliedVector.e(2);
      return new Point([x, y]);
    }
    super.multiply(other);
  }
}

export default Matrix;
