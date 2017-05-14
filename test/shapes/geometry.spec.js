import chai from "chai";
import _ from "lodash";
import {Vector} from "sylvester-es6";
import Geometry from "../../src/shapes/geometry";

let assert = chai.assert;

describe('Geometry', () => {
  let geometry;
  let corners;
  let edges;
  let camera;

  beforeEach(function () {
    corners = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]];
    edges = [[0, 1], [2, 3], [0, 2], [1, 3], [4, 5], [6, 7], [4, 6], [5, 7], [0, 4], [1, 5], [2, 6], [3, 7]];
    camera = [1, 1, 8];
    geometry = new Geometry(corners, edges, camera);
  });

  describe('initialized Geometry', () => {
    it('initialized without error', () => {
      assert.doesNotThrow(()=>new Geometry(corners, edges, camera));
    });

    it('initialized corners', () => {
      assert.strictEqual(geometry._corners.length, corners.length);
      _.each(_.range(corners.length), index => {
        assert.isTrue(geometry._corners[index].eql(corners[index]));
      });
    });

    it('initialized corners not array', () => {
      assert.throws(()=>new Geometry(null, edges, camera), TypeError, "Corners must be an array.");
    });

    it('initialized corners with wrong corner', () => {
      corners = [{}];
      assert.throws(()=>new Geometry(corners, edges, camera), TypeError, "Corner must be an array.");
    });

    it('initialized corners with wrong corner dimension', () => {
      corners = [[0, 0]];
      assert.throws(()=>new Geometry(corners, edges, camera), Error, "Corner must be a 3D.");
    });

    it('initialized edges', () => {
      assert.strictEqual(geometry._edges.length, edges.length);
      _.each(_.range(edges.length), index => {
        assert.isTrue(geometry._edges[index].eql(edges[index]));
      });
    });

    it('initialized edges not array', () => {
      assert.throws(()=>new Geometry(corners, null, camera), TypeError, "Edges must be an array.");
    });

    it('initialized edges with wrong edge', () => {
      edges = [{}];
      assert.throws(()=>new Geometry(corners, edges, camera), TypeError, "Edge must be an array.");
    });

    it('initialized edges with wrong edge dimension', () => {
      edges = [[0]];
      assert.throws(()=>new Geometry(corners, edges, camera), Error, "Edge must be a 2D.");
    });

    it('initialized camera', () => {
      assert.isTrue(geometry._camera.eql(camera));
    });

    it('initialized camera not array', () => {
      assert.throws(()=>new Geometry(corners, edges, null), TypeError, "Camera must be an array.");
    });

    it('initialized camera with wrong camera dimension', () => {
      camera = [[0, 0]];
      assert.throws(()=>new Geometry(corners, edges, camera), Error, "Camera must be a 3D");
    });
  });

  describe('methods', () => {
    it('set corners', () => {
      corners = [[-1, -1, -1], [1, -1, -1], [-1, 1, -1], [1, 1, -1], [-1, -1, 1], [1, -1, 1], [-1, 1, 1], [1, 1, 1]];
      geometry.corners = corners;

      assert.strictEqual(geometry._corners.length, corners.length);
      _.each(_.range(corners.length), index => {
        assert.isTrue(geometry._corners[index].eql(corners[index]));
      });
    });

    it('set edges', () => {
      edges = [[0, 1], [2, 3], [0, 2], [1, 3], [4, 5], [6, 7], [4, 6]];
      geometry.edges = edges;

      assert.strictEqual(geometry._edges.length, edges.length);
      _.each(_.range(edges.length), index => {
        assert.isTrue(geometry._edges[index].eql(edges[index]));
      });
    });

    it('set camera', () => {
      camera = [0, 0, 0];
      geometry.camera = camera;

      assert.isTrue(geometry._camera.eql(camera));
    });

    it('_cornerScaleDown', () => {
      let corner = new Vector([3, 3, 3]);
      let expected = new Vector([1, 1, 1]);
      assert.isTrue(geometry._cornerScaleDown(corner).eql(expected));
    });

    it('_convertCorner2Pixel', () => {
      let corner = new Vector([3, 3, 1]);
      let expected = new Vector([3, 3]);
      assert.isTrue(geometry._convertCorner2Pixel(corner).eql(expected));
    });
  });
});
