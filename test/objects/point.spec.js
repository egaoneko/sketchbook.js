import chai from "chai";
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
  });
});
