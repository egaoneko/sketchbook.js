import chai from "chai";
import Shape from "../../src/shapes/shape";
import Point from "../../src/objects/point";
import Group from "../../src/shapes/group";
import CanvasMatrix from "../../src/objects/canvas_matrix";


let assert = chai.assert;

describe('Group', () => {
  let group;

  beforeEach(function () {
    group = new Group();
  });

  describe('initialized Group', () => {
    it('initialized ', () => {
      assert.deepEqual(group._objects, []);
    });
  });

  describe('methods', () => {
    it('_add', () => {
      let shape = new Shape();
      let objects = group._objects;
      let oldObjectsSize = objects.length;

      group._add(shape);
      assert.strictEqual(objects.length - oldObjectsSize, 1);
      assert.strictEqual(objects[objects.length - 1], shape);
    });

    it('_add with wrong', () => {
      let object = {};
      assert.throws(()=>group._add(object), Error, "This object isn't a instance of Shape.");
    });

    it('add with shapes', () => {
      let shapes = [new Shape(), new Shape(), new Shape()];
      let objects = group._objects;
      let oldObjectsSize = objects.length;

      group.add(shapes);
      assert.strictEqual(objects.length - oldObjectsSize, shapes.length);

      let startIdx = objects.length - shapes.length;
      for (let idx = startIdx; idx < shapes.length; idx++) {
        assert.strictEqual(objects[idx], shapes[idx - startIdx]);
      }
    });

    it('add with shape', () => {
      let shape = new Shape();
      let objects = group._objects;
      let oldObjectsSize = objects.length;

      group.add(shape);
      assert.strictEqual(objects.length - oldObjectsSize, 1);
      assert.strictEqual(objects[objects.length - 1], shape);
    });

    it('add without shapes', () => {
      assert.throws(()=>group.add(), Error, "Cannot found shapes.");
    });

    it('scale each', () => {
      let shape = new Shape();
      let objects = group._objects;

      group.add(shape);

      let xScale = 2;
      let yScale = 2;
      shape = objects[objects.length - 1];

      group.scale(xScale, yScale);
      checkScale(xScale, yScale, shape);
    });

    it('scale list', () => {
      let shapes = [new Shape(), new Shape(), new Shape()];
      let objects = group._objects;

      group.add(shapes);

      let xScale = 2;
      let yScale = 2;

      group.scale(xScale, yScale);
      let startIdx = objects.length - shapes.length;
      for (let idx = startIdx; idx < shapes.length; idx++) {
        checkScale(xScale, yScale, objects[idx]);
      }
    });

    function checkScale(xScale, yScale, shape) {
      let matrix = new CanvasMatrix(xScale, 0, 0, yScale, 0, 0);
      assert.strictEqual(shape._cs._xScale, xScale);
      assert.strictEqual(shape._cs._yScale, yScale);
      assert.isTrue(shape._cs._basis.equal(matrix));
    }

    it('rotate each', () => {
      let shape = new Shape();
      let objects = group._objects;

      group.add(shape);

      let radian = 90 * Math.PI / 180;
      shape = objects[objects.length - 1];

      group.rotate(radian);
      checkRotate(radian, shape);
    });

    it('rotate list', () => {
      let shapes = [new Shape(), new Shape(), new Shape()];
      let objects = group._objects;

      group.add(shapes);

      let radian = 90 * Math.PI / 180;

      group.rotate(radian);
      let startIdx = objects.length - shapes.length;
      for (let idx = startIdx; idx < shapes.length; idx++) {
        checkRotate(radian, objects[idx]);
      }
    });

    function checkRotate(radian, shape) {
      let a = Math.cos(radian);
      let b = Math.sin(radian);
      let c = -Math.sin(radian);
      let d = Math.cos(radian);
      let matrix = new CanvasMatrix(a, b, c, d, 0, 0);
      assert.strictEqual(shape._cs._radian, radian);
      assert.isTrue(shape._cs._basis.equal(matrix));
    }

    it('translate each', () => {
      let shape = new Shape();
      let objects = group._objects;

      group.add(shape);

      let position = new Point([3, 4]);
      shape = objects[objects.length - 1];

      group.translate(position.x, position.y);
      checkTranslate(position, shape);
    });

    it('translate list', () => {
      let shapes = [new Shape(), new Shape(), new Shape()];
      let objects = group._objects;

      group.add(shapes);

      let position = new Point([3, 4]);

      group.translate(position.x, position.y);
      let startIdx = objects.length - shapes.length;
      for (let idx = startIdx; idx < shapes.length; idx++) {
        checkTranslate(position, objects[idx]);
      }
    });

    function checkTranslate(position, shape) {
      let matrix = new CanvasMatrix(1, 0, 0, 1, position.x, position.y);
      assert.strictEqual(shape._cs._position.x, position.x);
      assert.strictEqual(shape._cs._position.y, position.y);
      assert.isTrue(shape._cs._basis.equal(matrix));
    }
  });
});
