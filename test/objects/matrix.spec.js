import chai from "chai";
import {Matrix as SylvesterMatrix, Vector as SylvesterVector} from "sylvester-es6";
import Matrix from "../../src/objects/matrix";
import Point from "../../src/objects/point";

let assert = chai.assert;

describe('Matrix', () => {
  let matrix = null;

  beforeEach(function () {
    matrix = new Matrix([[1, 2, 3]]);
  });

  describe('initialized Matrix', () => {
    it('is instanceof SylvesterMatrix', () => {
      assert.isTrue(matrix instanceof SylvesterMatrix);
    });
  });

  describe('methods', () => {
    it('multiply with Point', () => {
      let expected = new SylvesterMatrix([[0, 2, 4], [1, 3, 5], [0, 0, 1]])
        .multiply(new SylvesterVector([0, 2, 1]));
      let actual = new Matrix([[0, 2, 4], [1, 3, 5], [0, 0, 1]])
        .multiply(new Point([0, 2]));
      assert.isTrue(actual._vector.eql(expected));
    });

    it('multiply with Point but Matrix is not 3x3', () => {
      let expected = new SylvesterMatrix([[0, 2], [1, 3], [0, 0]])
        .multiply(new SylvesterVector([0, 2, 1]));
      let actual = new Matrix([[0, 2], [1, 3], [0, 0]])
        .multiply(new Point([0, 2]));
      assert.strictEqual(actual, expected);
    });
  });
});
