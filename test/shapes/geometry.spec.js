import chai from "chai";
import _ from "lodash";
import Geometry from "../../src/shapes/geometry";
import Point from "../../src/objects/point";
import {GEOMETRY_TYPE} from "../../src/global/global";


let assert = chai.assert;

describe('Geometry', () => {
  let geometry;
  let corners;

  beforeEach(function () {
    corners = [[0, 0], [1, 0], [0, 1], [1, 1]];
    geometry = new Geometry(corners);
  });

  describe('initialized Geometry', () => {
    it('initialized without error', () => {
      assert.doesNotThrow(()=>new Geometry(corners));
    });

    it('_initCorners', () => {
      corners = [[1, 1], [1, 0], [1, 0], [0, 0]];
      geometry._initCorners(corners);
      assert.strictEqual(geometry._corners.length, corners.length);
      _.each(_.range(corners.length), index => {
        assert.strictEqual(geometry._corners[index].x, corners[index][0]);
        assert.strictEqual(geometry._corners[index].y, corners[index][1]);
      });
    });

    it('_initCorners not array', () => {
      assert.throws(()=>geometry._initCorners(null), TypeError, "Corners must be an array.");
    });

    it('_initCorners with wrong corner', () => {
      corners = [{}];
      assert.throws(()=>geometry._initCorners(corners), TypeError, "Add wrong corner type.");
    });

    it('_addArrayCorner', () => {
      let oldLength = geometry._corners.length;
      let corner = [1, 1];
      geometry._addArrayCorner(corner);
      assert.strictEqual(geometry._corners.length, oldLength + 1);
      assert.strictEqual(geometry._corners[oldLength].x, corner[0]);
      assert.strictEqual(geometry._corners[oldLength].y, corner[1]);
    });

    it('_addArrayCorner with wrong corner dimension', () => {
      let corner = [0, 0, 0];
      assert.throws(()=>geometry._addArrayCorner(corner), Error, "Corner must be a 2D.");
    });

    it('_addPointCorner', () => {
      let oldLength = geometry._corners.length;
      let corner = new Point([1, 1]);
      geometry._addPointCorner(corner);
      assert.strictEqual(geometry._corners.length, oldLength + 1);
      assert.strictEqual(geometry._corners[oldLength].x, corner.x);
      assert.strictEqual(geometry._corners[oldLength].y, corner.y);
    });
  });

  describe('options', () => {
    describe('geometryType', () => {
      it('initialized default geometryType', () => {
        assert.strictEqual(geometry._opt.geometryType, GEOMETRY_TYPE.POLYGON);
      });

      it('get option geometryType', () => {
        assert.strictEqual(geometry.getOption("geometryType"), GEOMETRY_TYPE.POLYGON);
      });

      it('set option geometryType', () => {
        geometry.setOption("geometryType", GEOMETRY_TYPE.POLYLINE);
        assert.strictEqual(geometry._opt.geometryType, GEOMETRY_TYPE.POLYLINE);
      });
    });
  });

  describe('methods', () => {
    it('get corners', () => {
      let getCorners = geometry.corners;
      _.each(_.range(corners.length), index => {
        assert.notStrictEqual(getCorners[index], geometry._corners[index]);
        assert.strictEqual(getCorners[index].x, corners[index][0]);
        assert.strictEqual(getCorners[index].y, corners[index][1]);
      });
    });

    it('set corners', () => {
      corners = [[-1, -1], [1, -1], [-1, 1], [1, 1], [-1, -1], [1, -1], [-1, 1], [1, 1]];
      geometry.corners = corners;

      assert.strictEqual(geometry._corners.length, corners.length);
      _.each(_.range(corners.length), index => {
        assert.strictEqual(geometry._corners[index].x, corners[index][0]);
        assert.strictEqual(geometry._corners[index].y, corners[index][1]);
      });
    });
  });
});
