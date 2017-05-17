import chai from "chai";
import Circle from "../../src/shapes/circle";


let assert = chai.assert;

describe('Circle', () => {
  let circle;

  beforeEach(function () {
    circle = new Circle();
  });

  describe('initialized Circle', () => {
    it('initialized radius', () => {
      assert.strictEqual(circle._opt.radius, 0);
    });

    it('initialized sAngle', () => {
      assert.strictEqual(circle._opt.sAngle, 0);
    });

    it('initialized eAngle', () => {
      assert.strictEqual(circle._opt.eAngle, 0);
    });

    it('initialized counterclockwise', () => {
      assert.strictEqual(circle._opt.counterclockwise, false);
    });
  });

  describe('options', () => {
    it('initialized set options', () => {
      circle = new Circle({
        radius: 10,
        sAngle: 1,
        eAngle: 1,
        counterclockwise: true
      });
      assert.strictEqual(circle._opt.radius, 10);
      assert.strictEqual(circle._opt.sAngle, 1);
      assert.strictEqual(circle._opt.eAngle, 1);
      assert.strictEqual(circle._opt.counterclockwise, true);
    });
  });

  describe('methods', () => {
    it('get radius', () => {
      assert.strictEqual(circle.radius, 0);
    });

    it('set radius', () => {
      let radius = 50;
      circle.radius = radius;
      assert.strictEqual(circle._opt.radius, radius);
    });

    it('get sAngle', () => {
      assert.strictEqual(circle.sAngle, 0);
    });

    it('set sAngle', () => {
      let sAngle = 1;
      circle.sAngle = sAngle;
      assert.strictEqual(circle._opt.sAngle, sAngle);
    });

    it('get eAngle', () => {
      assert.strictEqual(circle.eAngle, 0);
    });

    it('set eAngle', () => {
      let eAngle = 50;
      circle.eAngle = eAngle;
      assert.strictEqual(circle._opt.eAngle, eAngle);
    });

    it('get counterclockwise', () => {
      assert.strictEqual(circle.counterclockwise, false);
    });

    it('set counterclockwise', () => {
      let counterclockwise = true;
      circle.counterclockwise = counterclockwise;
      assert.strictEqual(circle._opt.counterclockwise, counterclockwise);
    });
  });
});
