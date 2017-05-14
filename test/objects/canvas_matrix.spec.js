import chai from "chai";
import {Matrix, Vector} from "sylvester-es6";
import CanvasMatrix from "../../src/objects/canvas_matrix";
import Point from "../../src/objects/point";

let assert = chai.assert;

describe('CanvasMatrix', () => {
  let canvasMatrix = null;

  beforeEach(function () {
    canvasMatrix = new CanvasMatrix();
  });

  describe('initialized CanvasMatrix', () => {
    it('check size', () => {
      assert.strictEqual(canvasMatrix.rows, 3);
      assert.strictEqual(canvasMatrix.cols, 3);
    });

    it('initialized CanvasMatrix', () => {
      assert.strictEqual(canvasMatrix.a, 1);
      assert.strictEqual(canvasMatrix.b, 0);
      assert.strictEqual(canvasMatrix.c, 0);
      assert.strictEqual(canvasMatrix.d, 1);
      assert.strictEqual(canvasMatrix.e, 0);
      assert.strictEqual(canvasMatrix.f, 0);
      checkRow3_001(canvasMatrix);
    });

    it('initialized CanvasMatrix with params', () => {
      canvasMatrix = new CanvasMatrix(0, 1, 2, 3, 4, 5);
      assert.strictEqual(canvasMatrix.a, 0);
      assert.strictEqual(canvasMatrix.b, 1);
      assert.strictEqual(canvasMatrix.c, 2);
      assert.strictEqual(canvasMatrix.d, 3);
      assert.strictEqual(canvasMatrix.e, 4);
      assert.strictEqual(canvasMatrix.f, 5);
      checkRow3_001(canvasMatrix);
    });

    it('initialized CanvasMatrix with CanvasMatrix', () => {
      let oldCanvasMatrix = new CanvasMatrix(0, 1, 2, 3, 4, 5);
      canvasMatrix = new CanvasMatrix(oldCanvasMatrix);
      assert.strictEqual(canvasMatrix.a, oldCanvasMatrix.a);
      assert.strictEqual(canvasMatrix.b, oldCanvasMatrix.b);
      assert.strictEqual(canvasMatrix.c, oldCanvasMatrix.c);
      assert.strictEqual(canvasMatrix.d, oldCanvasMatrix.d);
      assert.strictEqual(canvasMatrix.e, oldCanvasMatrix.e);
      assert.strictEqual(canvasMatrix.f, oldCanvasMatrix.f);
      checkRow3_001(canvasMatrix);
    });

    it('initialized with wrong parameters', () => {
      assert.throws(()=>new CanvasMatrix(1, 1), Error, "Initialized with wrong parameters.");
      assert.throws(()=>new CanvasMatrix(1), TypeError, "Initialized with wrong parameter.(Different class)");
      // assert.throws(()=>new CanvasMatrix([0]), Error, "Initialized with wrong parameters.");
    });
  });

  describe('methods', () => {
    it('equal true', () => {
      let a = new CanvasMatrix(0, 1, 2, 3, 4, 5);
      let b = new CanvasMatrix(0, 1, 2, 3, 4, 5);
      assert.isTrue(a.equal(b));
    });

    it('equal false', () => {
      let a = new CanvasMatrix(0, 1, 2, 3, 4, 5);
      let b = new CanvasMatrix(0, 1, 2, 3, 4, 6);
      assert.isFalse(a.equal(b));
    });

    it('add', () => {
      let expected = new Matrix([[0, 2, 4], [1, 3, 5], [0, 0, 1]])
        .add(new Matrix([[0, 2, 4], [1, 3, 5], [0, 0, 1]]));
      let actual = new CanvasMatrix(0, 1, 2, 3, 4, 5)
        .add(new CanvasMatrix(0, 1, 2, 3, 4, 5));
      assert.strictEqual(actual.a, expected.e(1, 1));
      assert.strictEqual(actual.b, expected.e(2, 1));
      assert.strictEqual(actual.c, expected.e(1, 2));
      assert.strictEqual(actual.d, expected.e(2, 2));
      assert.strictEqual(actual.e, expected.e(1, 3));
      assert.strictEqual(actual.f, expected.e(2, 3));
    });

    it('add with wrong parameters', () => {
      assert.throws(()=>new CanvasMatrix(0, 1, 2, 3, 4, 5).add({}), TypeError, "Added by wrong parameter.(Different class)");
    });

    it('multiply with CanvasMatrix', () => {
      let expected = new Matrix([[0, 2, 4], [1, 3, 5], [0, 0, 1]])
        .multiply(new Matrix([[0, 2, 4], [1, 3, 5], [0, 0, 1]]));
      let actual = new CanvasMatrix(0, 1, 2, 3, 4, 5)
        .multiply(new CanvasMatrix(0, 1, 2, 3, 4, 5));
      assert.isTrue(actual._matrix.eql(expected));
    });

    it('multiply with wrong parameters', () => {
      assert.throws(()=>new CanvasMatrix(0, 1, 2, 3, 4, 5).multiply({}), TypeError, "Multiplied by wrong parameter.(Different class)");
    });

    it('multiply with Point', () => {
      let expected = new Matrix([[0, 2, 4], [1, 3, 5], [0, 0, 1]])
        .multiply(new Vector([0, 2, 1]));
      let actual = new CanvasMatrix(0, 1, 2, 3, 4, 5)
        .multiply(new Point([0, 2]));
      assert.isTrue(actual._vector.eql(expected));
    });

    it('inverse', () => {
      let expected = new Matrix([[0, 2, 4], [1, 3, 5], [0, 0, 1]]).inverse();
      let actual = new CanvasMatrix(0, 1, 2, 3, 4, 5).inverse();
      assert.isTrue(actual.eql(expected));
    });
  });

  function checkRow3_001(canvasMatrix) {
    assert.strictEqual(canvasMatrix._matrix.e(3, 1), 0);
    assert.strictEqual(canvasMatrix._matrix.e(3, 2), 0);
    assert.strictEqual(canvasMatrix._matrix.e(3, 3), 1);
  }
});
