import chai from "chai";
import Rect from "../../src/shapes/rect";
import Point from "../../src/objects/point";
import {ORIGIN} from "../../src/global/global";


let assert = chai.assert;

describe('Rect', () => {
  let rect;

  beforeEach(() => {
    rect = new Rect();
  });

  describe('initialized Rect', () => {
    it('initialized width', () => {
      assert.strictEqual(rect._opt.width, 0);
    });

    it('initialized height', () => {
      assert.strictEqual(rect._opt.height, 0);
    });
  });

  describe('options', () => {
    it('initialized set options', () => {
      rect = new Rect({
        width: 10,
        height: 20
      });
      assert.strictEqual(rect._opt.width, 10);
      assert.strictEqual(rect._opt.height, 20);
    });

    describe('origin', () => {
      it('initialized default origin', () => {
        assert.strictEqual(rect._opt.origin, ORIGIN.LEFT_TOP);
      });

      it('get option origin', () => {
        assert.strictEqual(rect.getOption("origin"), ORIGIN.LEFT_TOP);
      });

      it('set option origin', () => {
        rect.setOption("origin", ORIGIN.CENTER);
        assert.strictEqual(rect._opt.origin, ORIGIN.CENTER);
      });
    });
  });

  describe('methods', () => {
    it('get width', () => {
      assert.strictEqual(rect.width, 0);
    });

    it('get height', () => {
      assert.strictEqual(rect.height, 0);
    });

    it('set width', () => {
      let width = 50;
      rect.width = width;
      assert.strictEqual(rect._opt.width, width);
    });

    it('set height', () => {
      let height = 50;
      rect.height = height;
      assert.strictEqual(rect._opt.height, height);
    });

    it('get origin with ORIGIN.LEFT_TOP option', () => {
      rect.position = new Point([100, 50]);
      let position = rect._getOrigin();

      assert.strictEqual(position.x, 100);
      assert.strictEqual(position.y, 50);
    });

    it('get origin with ORIGIN.CENTER option', () => {
      rect.position = new Point([100, 50]);
      rect.setOption("origin", ORIGIN.CENTER);

      rect.width = 50;
      rect.height = 50;
      let position = rect._getOrigin();

      assert.strictEqual(position.x, 75);
      assert.strictEqual(position.y, 25);
    });
  });
});
