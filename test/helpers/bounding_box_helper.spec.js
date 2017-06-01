import chai from "chai";
import BoundingBoxHelper from "../../src/helpers/bounding_box_helper";
import Point from "../../src/objects/point";


let assert = chai.assert;

describe('BoundingBoxHelper', () => {
  let boundingBoxHelper;
  let points = [new Point([5, 10]), new Point([0, 30]), new Point([15, 15]), new Point([20, 50])];

  beforeEach(() => {
    boundingBoxHelper = new BoundingBoxHelper();
  });

  describe('initialized BoundingBoxHelper', () => {
    it('initialized bounding box', () => {
      assert.strictEqual(boundingBoxHelper._minX, +Infinity);
      assert.strictEqual(boundingBoxHelper._minY, +Infinity);
      assert.strictEqual(boundingBoxHelper._maxX, -Infinity);
      assert.strictEqual(boundingBoxHelper._maxY, -Infinity);
    });
  });

  describe('methods', () => {
    it('_add point', () => {
      boundingBoxHelper._add(new Point([5, 10]));

      assert.strictEqual(boundingBoxHelper._minX, 5);
      assert.strictEqual(boundingBoxHelper._minY, 10);
      assert.strictEqual(boundingBoxHelper._maxX, 5);
      assert.strictEqual(boundingBoxHelper._maxY, 10);
    });

    it('_add point with wrong', () => {
      assert.throws(()=>boundingBoxHelper._add({}), TypeError, "The parameter must be Point.");
    });

    it('add points', () => {
      boundingBoxHelper.add(points);

      assert.strictEqual(boundingBoxHelper._minX, 0);
      assert.strictEqual(boundingBoxHelper._minY, 10);
      assert.strictEqual(boundingBoxHelper._maxX, 20);
      assert.strictEqual(boundingBoxHelper._maxY, 50);
    });

    it('clear', () => {
      boundingBoxHelper._minX = -1;
      boundingBoxHelper._minY = -1;
      boundingBoxHelper._maxX = -1;
      boundingBoxHelper._maxY = -1;
      boundingBoxHelper.clear();

      assert.strictEqual(boundingBoxHelper._minX, +Infinity);
      assert.strictEqual(boundingBoxHelper._minY, +Infinity);
      assert.strictEqual(boundingBoxHelper._maxX, -Infinity);
      assert.strictEqual(boundingBoxHelper._maxY, -Infinity);
    });

    it('center', () => {
      boundingBoxHelper.add(points);
      let center = boundingBoxHelper.center;

      assert.strictEqual(center.x, 10);
      assert.strictEqual(center.y, 30);
    });

    it('center without add', () => {
      let center = boundingBoxHelper.center;

      assert.isNaN(center.x);
      assert.isNaN(center.y);
    });
  });
});
