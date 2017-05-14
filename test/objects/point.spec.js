import chai from "chai";
import {Vector} from "sylvester-es6";
import Point from "../../src/objects/point";

let assert = chai.assert;

describe('Point', () => {
  let point = null;

  beforeEach(function () {
    point = new Point([0, 0]);
  });

  describe('initialized Point', () => {
    it('initialized point with elements', () => {
      assert.strictEqual(point.x, 0);
      assert.strictEqual(point.y, 0);
    });

    it('initialized point with Point', () => {
      let oldPoint = new Point([3, 4]);
      point = new Point(oldPoint);
      assert.strictEqual(point.x, 3);
      assert.strictEqual(point.y, 4);
    });

    it('initialized with wrong elements', () => {
      assert.throws(()=>new Point(1), Error, "Initialized with wrong elements.");
      assert.throws(()=>new Point([0, 0, 0]), Error, "Initialized with wrong elements.");
      assert.throws(()=>new Point([0]), Error, "Initialized with wrong elements.");
    });

    it('add', () => {
      let expected = new Vector([1, 2]).add(new Vector([3, 4]));
      expected = new Vector([expected.e(1), expected.e(2), 1]);
      let actual = new Point([1, 2]).add(new Point([3, 4]));
      assert.isTrue(actual._vector.eql(expected));
    });

    it('add with wrong parameters', () => {
      assert.throws(()=>new Point([1, 2]).add({}), TypeError, "Added by wrong parameter.(Different class)");
    });

    it('equal true', () => {
      let a = new Point([1, 2]);
      let b = new Point([1, 2]);
      assert.isTrue(a.equal(b));
    });

    it('equal false', () => {
      let a = new Point([1, 2]);
      let b = new Point([1, 3]);
      assert.isFalse(a.equal(b));
    });
  });
});
