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
  });

  describe('options', () => {
    it('initialized set options', () => {
      circle = new Circle({
        radius: 10
      });
      assert.strictEqual(circle._opt.radius, 10);
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
  });
});
