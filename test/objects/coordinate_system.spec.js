import chai from "chai";
import CoordinateSystem from "../../src/objects/coordinate_system";
import CanvasMatrix from "../../src/objects/canvas_matrix";
import Point from "../../src/objects/point";
import {ORIENTATION} from "../../src/global/global";


let assert = chai.assert;

describe('CoordinateSystem', () => {
  let cs = null;

  beforeEach(function () {
    cs = new CoordinateSystem();
  });

  describe('initialized CoordinateSystem', () => {
    it('initialized position', () => {
      let position = cs._position;
      assert.strictEqual(position.x, 0);
      assert.strictEqual(position.y, 0);
    });

    it('initialized scale', () => {
      let xScale = cs._xScale;
      let yScale = cs._yScale;
      assert.strictEqual(xScale, 1);
      assert.strictEqual(yScale, 1);
    });

    it('initialized radian', () => {
      let radian = cs._radian;
      assert.strictEqual(radian, 0.0);
    });

    it('initialized matrix', () => {
      checkMatrix(cs._basis);
    });
  });

  describe('options', () => {
    describe('orientation', () => {
      it('initialized default orientation', () => {
        assert.strictEqual(cs._opt.orientation, ORIENTATION.CW);
      });

      it('initialized set orientation', () => {
        cs = new CoordinateSystem({orientation: ORIENTATION.CCW});
        assert.strictEqual(cs._opt.orientation, ORIENTATION.CCW);
      });

      it('get option orientation', () => {
        assert.strictEqual(cs.getOption("orientation"), ORIENTATION.CW);
      });

      it('set option orientation', () => {
        cs.setOption("orientation", ORIENTATION.CCW);
        assert.strictEqual(cs._opt.orientation, ORIENTATION.CCW);
      });
    });
  });

  describe('methods', () => {
    it('scale', () => {
      let xScale = 2;
      let yScale = 2;
      let matrix = new CanvasMatrix(xScale, 0, 0, yScale, 0, 0);

      cs.scale(xScale, yScale);
      assert.strictEqual(cs._xScale, xScale);
      assert.strictEqual(cs._yScale, yScale);
      assert.isTrue(cs._basis.equal(matrix));
      assert.isTrue(cs._isNeedToUpdate);
    });

    it('scale twice', () => {
      let xScale = 3;
      let yScale = 3;
      let matrix = new CanvasMatrix(xScale, 0, 0, yScale, 0, 0);
      matrix = matrix.multiply(new CanvasMatrix(xScale, 0, 0, yScale, 0, 0));

      cs.scale(xScale, yScale);
      cs.scale(xScale, yScale);
      assert.strictEqual(cs._xScale, xScale * xScale);
      assert.strictEqual(cs._yScale, yScale * xScale);
      assert.isTrue(cs._basis.equal(matrix));
      assert.isTrue(cs._isNeedToUpdate);
    });

    it('scale twice matrix', () => {
      let xScale = 3;
      let yScale = 3;
      let twiceScaledCS = new CoordinateSystem();

      cs.scale(xScale, yScale);
      cs.scale(xScale, yScale);
      twiceScaledCS.scale(xScale * xScale, yScale * yScale);
      assert.isTrue(cs._basis.equal(twiceScaledCS._basis));
    });

    it('rotate cw', () => {
      let radian = 90 * Math.PI / 180;
      let a = Math.cos(radian);
      let b = Math.sin(radian);
      let c = -Math.sin(radian);
      let d = Math.cos(radian);
      let matrix = new CanvasMatrix(a, b, c, d, 0, 0);

      assert.strictEqual(cs._opt.orientation, ORIENTATION.CW);
      cs.rotate(radian);
      assert.strictEqual(cs._radian, radian);
      assert.isTrue(cs._basis.equal(matrix));
      assert.isTrue(cs._isNeedToUpdate);
    });

    it('rotate cw twice', () => {
      let radian = 90 * Math.PI / 180;
      let a = Math.cos(radian);
      let b = Math.sin(radian);
      let c = -Math.sin(radian);
      let d = Math.cos(radian);
      let matrix = new CanvasMatrix(a, b, c, d, 0, 0);
      matrix = matrix.multiply(new CanvasMatrix(a, b, c, d, 0, 0));

      assert.strictEqual(cs._opt.orientation, ORIENTATION.CW);
      cs.rotate(radian);
      cs.rotate(radian);
      assert.strictEqual(cs._radian, radian * 2);
      assert.isTrue(cs._basis.equal(matrix));
      assert.isTrue(cs._isNeedToUpdate);
    });

    it('rotate cw twice matrix', () => {
      let radian = 90 * Math.PI / 180;
      let twiceRotatedCS = new CoordinateSystem();

      cs.rotate(radian);
      cs.rotate(radian);
      twiceRotatedCS.rotate(radian * 2);
      assert.isTrue(cs._basis.equal(twiceRotatedCS._basis));
    });

    it('rotate ccw', () => {
      let radian = 90 * Math.PI / 180;
      let a = Math.cos(radian);
      let b = -Math.sin(radian);
      let c = Math.sin(radian);
      let d = Math.cos(radian);
      let matrix = new CanvasMatrix(a, b, c, d, 0, 0);
      cs = new CoordinateSystem({orientation: ORIENTATION.CCW});

      assert.strictEqual(cs._opt.orientation, ORIENTATION.CCW);
      cs.rotate(radian);
      assert.strictEqual(cs._radian, radian);
      assert.isTrue(cs._basis.equal(matrix));
      assert.isTrue(cs._isNeedToUpdate);
    });

    it('rotate ccw twice', () => {
      let radian = 90 * Math.PI / 180;
      let a = Math.cos(radian);
      let b = -Math.sin(radian);
      let c = Math.sin(radian);
      let d = Math.cos(radian);
      let matrix = new CanvasMatrix(a, b, c, d, 0, 0);
      matrix = matrix.multiply(new CanvasMatrix(a, b, c, d, 0, 0));
      cs = new CoordinateSystem({orientation: ORIENTATION.CCW});

      assert.strictEqual(cs._opt.orientation, ORIENTATION.CCW);
      cs.rotate(radian);
      cs.rotate(radian);
      assert.strictEqual(cs._radian, radian * 2);
      assert.isTrue(cs._basis.equal(matrix));
      assert.isTrue(cs._isNeedToUpdate);
    });

    it('rotate ccw twice matrix', () => {
      let radian = 90 * Math.PI / 180;
      cs = new CoordinateSystem({orientation: ORIENTATION.CCW});
      let twiceRotatedCS = new CoordinateSystem({orientation: ORIENTATION.CCW});

      cs.rotate(radian);
      cs.rotate(radian);
      twiceRotatedCS.rotate(radian * 2);
      assert.isTrue(cs._basis.equal(twiceRotatedCS._basis));
    });

    it('translate', () => {
      let position = new Point([3, 4]);
      let matrix = new CanvasMatrix(1, 0, 0, 1, position.x, position.y);

      cs.translate(position);
      assert.strictEqual(cs._position.x, position.x);
      assert.strictEqual(cs._position.y, position.y);
      assert.isTrue(cs._basis.equal(matrix));
      assert.isTrue(cs._isNeedToUpdate);
    });

    it('translate twice', () => {
      let position = new Point([3, 4]);
      let matrix = new CanvasMatrix(1, 0, 0, 1, position.x, position.y);
      matrix = matrix.multiply(new CanvasMatrix(1, 0, 0, 1, position.x, position.y));

      cs.translate(position);
      cs.translate(position);
      assert.strictEqual(cs._position.x, position.x * 2);
      assert.strictEqual(cs._position.y, position.y * 2);
      assert.isTrue(cs._basis.equal(matrix));
      assert.isTrue(cs._isNeedToUpdate);
    });

    it('translate twice matrix', () => {
      let position = new Point([3, 4]);
      let twiceTranslatedCS = new CoordinateSystem();

      cs.translate(position);
      cs.translate(position);
      twiceTranslatedCS.translate(new Point([3 * 2, 4 * 2]));
      assert.isTrue(cs._basis.equal(twiceTranslatedCS._basis));
    });

    it('get basis', () => {
      let xScale = 2;
      let yScale = 2;
      let radian = 90 * Math.PI / 180;
      let a = Math.cos(radian);
      let b = Math.sin(radian);
      let c = -Math.sin(radian);
      let d = Math.cos(radian);
      let position = new Point([3, 4]);

      let scaleMatrix = new CanvasMatrix(xScale, 0, 0, yScale, 0, 0);
      let rotateMatrix = new CanvasMatrix(a, b, c, d, 0, 0);
      let translateMatrix = new CanvasMatrix(1, 0, 0, 1, position.x, position.y);

      cs.scale(xScale, yScale);
      cs.rotate(radian);
      cs.translate(position);

      let expected = scaleMatrix.multiply(rotateMatrix).multiply(translateMatrix);
      let actual = cs.basis;
      assert.isTrue(actual.equal(expected));
    });

    it('set basis', () => {
      let matrix = new CanvasMatrix(1, 2, 3, 4, 5, 6);
      cs.basis = matrix;
      assert.isTrue(cs.basis.equal(matrix));
    });

    it('set basis with wrong input', () => {
      assert.throws(()=>cs.basis = "wrong input", TypeError, "Input basis is not CanvasMatrix.");
    });
  });

  function checkMatrix(matrix) {
    assert.strictEqual(matrix.a, 1);
    assert.strictEqual(matrix.b, 0);
    assert.strictEqual(matrix.c, 0);
    assert.strictEqual(matrix.d, 1);
    assert.strictEqual(matrix.e, 0);
    assert.strictEqual(matrix.f, 0);
    assert.strictEqual(matrix._matrix.e(3, 1), 0);
    assert.strictEqual(matrix._matrix.e(3, 2), 0);
    assert.strictEqual(matrix._matrix.e(3, 3), 1);
  }
});
