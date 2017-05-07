import chai from "chai";
import Line from "../../src/shapes/line";


let assert = chai.assert;

describe('Line', () => {
  let line;

  beforeEach(function () {
    line = new Line();
  });

  describe('initialized Line', () => {
    it('initialized start', () => {
      assert.strictEqual(line._opt.x1, 0);
      assert.strictEqual(line._opt.y1, 0);
    });

    it('initialized end', () => {
      assert.strictEqual(line._opt.x2, 0);
      assert.strictEqual(line._opt.y2, 0);
    });
  });

  describe('options', () => {
    it('initialized set options', () => {
      line = new Line({
        x1: 10,
        y1: 20,
        x2: 30,
        y2: 40,
      });
      assert.strictEqual(line._opt.x1, 10);
      assert.strictEqual(line._opt.y1, 20);
      assert.strictEqual(line._opt.x2, 30);
      assert.strictEqual(line._opt.y2, 40);
      assert.strictEqual(line._opt.x, (10 + 30) * 0.5);
      assert.strictEqual(line._opt.y, (20 + 40) * 0.5);
    });
  });

  describe('methods', () => {
    it('get x1', () => {
      assert.strictEqual(line.x1, 0);
    });

    it('get y1', () => {
      assert.strictEqual(line.y1, 0);
    });

    it('get x2', () => {
      assert.strictEqual(line.x2, 0);
    });

    it('get y2', () => {
      assert.strictEqual(line.y2, 0);
    });

    it('set x1', () => {
      let x1 = 50;
      line.x1 = x1;
      assert.strictEqual(line._opt.x1, x1);
      assert.strictEqual(line._opt.x, (0 + 50) * 0.5);
      assert.strictEqual(line._position.x, (0 + 50) * 0.5);
    });

    it('set y1', () => {
      let y1 = 50;
      line.y1 = y1;
      assert.strictEqual(line._opt.y1, y1);
      assert.strictEqual(line._opt.y, (0 + 50) * 0.5);
      assert.strictEqual(line._position.y, (0 + 50) * 0.5);
    });

    it('set x2', () => {
      let x2 = 50;
      line.x2 = x2;
      assert.strictEqual(line._opt.x2, x2);
      assert.strictEqual(line._opt.x, (0 + 50) * 0.5);
      assert.strictEqual(line._position.x, (0 + 50) * 0.5);
    });

    it('set y2', () => {
      let y2 = 50;
      line.y2 = y2;
      assert.strictEqual(line._opt.y2, y2);
      assert.strictEqual(line._opt.y, (0 + 50) * 0.5);
      assert.strictEqual(line._position.y, (0 + 50) * 0.5);
    });
  });
});
