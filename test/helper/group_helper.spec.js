import chai from "chai";
import GroupHelper from "../../src/helper/group_helper";
import Shape from "../../src/shapes/shape";
import {ArgumentError} from "../../src/errors/errors";


let assert = chai.assert;

describe('GroupHelper', () => {
  let groupHelper;

  beforeEach(function () {
    groupHelper = new GroupHelper();
  });

  describe('initialized GroupHelper', () => {
    it('initialized object', () => {
      assert.deepEqual(groupHelper._objects, []);
    });

    it('initialized distinct', () => {
      assert.strictEqual(groupHelper._distinct, false);
    });

    it('initialized validator', () => {
      assert.strictEqual(groupHelper._validator, null);
    });
  });

  describe('methods', () => {
    it('get distinct', () => {
      assert.strictEqual(groupHelper.distinct, false);
    });

    it('set distinct', () => {
      let distinct = true;
      groupHelper.distinct = distinct;
      assert.strictEqual(groupHelper._distinct, distinct);
    });

    it('get validator', () => {
      assert.strictEqual(groupHelper.validator, null);
    });

    it('set validator', () => {
      let validator = function () {
      };
      groupHelper.validator = validator;
      assert.strictEqual(groupHelper._validator, validator);
    });

    it('set validator with not function', () => {
      assert.throws(()=>groupHelper.validator = {}, TypeError, "The validator must be function.");
    });

    it('_add', () => {
      let object = {};
      let objects = groupHelper._objects;
      let oldObjectsSize = objects.length;

      groupHelper._add(object);
      assert.strictEqual(objects.length - oldObjectsSize, 1);
      assert.strictEqual(objects[objects.length - 1], object);
    });

    it('_add with not distinct', () => {
      let object = {};
      let objects = groupHelper._objects;
      let oldObjectsSize = objects.length;

      groupHelper.distinct = false;
      groupHelper._add(object);
      groupHelper._add(object);
      assert.strictEqual(objects.length - oldObjectsSize, 2);
      assert.strictEqual(objects[objects.length - 1], object);
      assert.strictEqual(objects[objects.length - 2], object);
    });

    it('_add with distinct', () => {
      groupHelper._add({});

      let object = {};
      let objects = groupHelper._objects;
      let oldObjectsSize = objects.length;

      groupHelper.distinct = true;
      groupHelper._add(object);
      groupHelper._add(object);
      assert.strictEqual(objects.length - oldObjectsSize, 1);
      assert.strictEqual(objects[objects.length - 1], object);
      assert.notStrictEqual(objects[objects.length - 2], object);
    });

    it('_add with validator and shape', () => {
      let shape = new Shape();
      groupHelper._validator = function (shape) {
        if (!(shape instanceof Shape)) {
          throw new ArgumentError("This object isn't a instance of Shape.");
        }
      };
      assert.doesNotThrow(()=>groupHelper._add(shape));
    });

    it('_add with validator and wrong object', () => {
      let object = {};
      groupHelper._validator = function (shape) {
        if (!(shape instanceof Shape)) {
          throw new ArgumentError("This object isn't a instance of Shape.");
        }
      };
      assert.throws(()=>groupHelper._add(object), Error, "This object isn't a instance of Shape.");
    });

    it('add with objects', () => {
      let objects = [{}, {}, {}];
      let inputObjects = groupHelper._objects;
      let oldObjectsSize = inputObjects.length;

      groupHelper.add(objects);
      assert.strictEqual(inputObjects.length - oldObjectsSize, objects.length);

      let startIdx = inputObjects.length - objects.length;
      for (let idx = startIdx; idx < objects.length; idx++) {
        assert.strictEqual(inputObjects[idx], objects[idx - startIdx]);
      }
    });

    it('add with object', () => {
      let object = {};
      let objects = groupHelper._objects;
      let oldObjectsSize = objects.length;

      groupHelper.add(object);
      assert.strictEqual(objects.length - oldObjectsSize, 1);
      assert.strictEqual(objects[objects.length - 1], object);
    });

    it('add without objects', () => {
      assert.throws(()=>groupHelper.add(), Error, "Cannot found objects.");
    });

    it('iterate objects', () => {
      let objects = [{isIterated: false}, {isIterated: false}, {isIterated: false}];

      groupHelper.add(objects);
      groupHelper.iterate(function (object) {
        object.isIterated = true;
      });

      for (let object of groupHelper._objects) {
        assert.isTrue(object.isIterated);
      }
    });

    it('iterate with not function', () => {
      assert.throws(()=>groupHelper.iterate({}), TypeError, "The callback must be function.");
    });
  });
});
