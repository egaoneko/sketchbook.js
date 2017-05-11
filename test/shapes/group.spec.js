import chai from "chai";
import Shape from "../../src/shapes/shape";
import Group from "../../src/shapes/group";


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
      let lenderList = group._objects;
      let oldListLength = lenderList.length;

      group._add(shape);
      assert.strictEqual(lenderList.length - oldListLength, 1);
      assert.strictEqual(lenderList[lenderList.length - 1], shape);
    });

    it('_add with wrong', () => {
      let object = {};
      assert.throws(()=>group._add(object), Error, "This object isn't a instance of Shape.");
    });

    it('add with shapes', () => {
      let shapes = [new Shape(), new Shape(), new Shape()];
      let lenderList = group._objects;
      let oldListLength = lenderList.length;

      group.add(shapes);
      assert.strictEqual(lenderList.length - oldListLength, shapes.length);

      let startIdx = lenderList.length - shapes.length;
      for (let idx = startIdx; idx < shapes.length; idx++) {
        assert.strictEqual(lenderList[idx], shapes[idx - startIdx]);
      }
    });

    it('add with shape', () => {
      let shape = new Shape();
      let lenderList = group._objects;
      let oldListLength = lenderList.length;

      group.add(shape);
      assert.strictEqual(lenderList.length - oldListLength, 1);
      assert.strictEqual(lenderList[lenderList.length - 1], shape);
    });

    it('add without shapes', () => {
      assert.throws(()=>group.add(), Error, "Cannot found shapes.");
    });
  });
});
