import chai from "chai";
import Sketchbook from "../src/sketchbook";
import CanvasMatrix from "../src/objects/canvas_matrix";
import Point from "../src/objects/point";
import {ORIENTATION, ORIGIN, COORDINATE_SYSTEM} from "../src/global/global";

let assert = chai.assert;

describe('Sketchbook', () => {
  let sketchbook;

  beforeEach(function () {
    sketchbook = new Sketchbook();
  });

  describe('initialized Sketchbook', () => {
    it('construct Sketchbook without parameter', () => {
      let canvas = sketchbook.canvas;
      assert.strictEqual(canvas.nodeName, "CANVAS");
    });

    it('construct Sketchbook with canvas element', () => {
      let canvasElement = document.createElement('canvas');
      sketchbook = new Sketchbook(canvasElement);
      let canvas = sketchbook.canvas;
      assert.strictEqual(canvas, canvasElement);
    });

    it('construct Sketchbook with wrong canvas element', () => {
      let wrongCanvasElement = document.createElement('a');
      assert.throws(()=>new Sketchbook(wrongCanvasElement), TypeError, "Input element is not canvas.");
    });

    it('construct Sketchbook with id', () => {
      let id = "canvas";
      let canvasElement = document.createElement('canvas');
      canvasElement.id = id;
      document.body.appendChild(canvasElement);
      sketchbook = new Sketchbook(id);
      let canvas = sketchbook.canvas;
      assert.strictEqual(canvas, canvasElement);
      assert.strictEqual(canvas.id, canvasElement.id);
    });

    it('construct Sketchbook with wrong id', () => {
      let wrongId = "wrong-canvas";
      assert.throws(()=>new Sketchbook(wrongId), Error, "Cannot found element by id.");
    });

    it('initialized position', () => {
      let position = sketchbook._position;
      assert.strictEqual(position.x, 0);
      assert.strictEqual(position.y, 0);
    });
  });

  describe('options', () => {
    describe('orientation', () => {
      it('get option orientation', () => {
        assert.strictEqual(sketchbook.getOption("orientation"), ORIENTATION.CW);
      });

      it('set option orientation', () => {
        sketchbook.setOption("orientation", ORIENTATION.CCW);
        assert.strictEqual(sketchbook._cs._opt.orientation, ORIENTATION.CCW);
      });
    });

    describe('origin', () => {
      it('initialized default origin', () => {
        assert.strictEqual(sketchbook._opt.origin, ORIGIN.LEFT_TOP);
      });

      it('get option origin', () => {
        assert.strictEqual(sketchbook.getOption("origin"), ORIGIN.LEFT_TOP);
      });

      it('set option origin', () => {
        sketchbook.setOption("origin", ORIGIN.CENTER);
        assert.strictEqual(sketchbook._opt.origin, ORIGIN.CENTER);
      });
    });

    describe('coordinateSystem', () => {
      it('get option coordinateSystem', () => {
        assert.strictEqual(sketchbook.getOption("coordinateSystem"), COORDINATE_SYSTEM.SCREEN);
      });

      it('set option coordinateSystem', () => {
        sketchbook.setOption("coordinateSystem", COORDINATE_SYSTEM.CARTESIAN);
        assert.strictEqual(sketchbook._cs._opt.coordinateSystem, COORDINATE_SYSTEM.CARTESIAN);
      });
    });
  });

  describe('methods', () => {
    it('get width', () => {
      let width = 500;
      let canvasElement = document.createElement('canvas');
      canvasElement.width = width;
      sketchbook = new Sketchbook(canvasElement);
      assert.strictEqual(sketchbook.width, width);
    });

    it('get height', () => {
      let height = 500;
      let canvasElement = document.createElement('canvas');
      canvasElement.height = height;
      sketchbook = new Sketchbook(canvasElement);
      assert.strictEqual(sketchbook.height, height);
    });

    it('set width', () => {
      let width = 500;
      let canvasElement = document.createElement('canvas');
      sketchbook = new Sketchbook(canvasElement);
      sketchbook.width = width;
      assert.strictEqual(sketchbook._canvas.width, width);
    });

    it('set height', () => {
      let height = 500;
      let canvasElement = document.createElement('canvas');
      sketchbook = new Sketchbook(canvasElement);
      sketchbook.height = height;
      assert.strictEqual(sketchbook._canvas.height, height);
    });

    it('get position', () => {
      assert.strictEqual(sketchbook.position.x, 0);
      assert.strictEqual(sketchbook.position.y, 0);
    });

    it('set position', () => {
      sketchbook.position = new Point([3, 4]);

      assert.strictEqual(sketchbook.position.x, 3);
      assert.strictEqual(sketchbook.position.y, 4);
    });

    it('set position with wrong input', () => {
      assert.throws(()=>sketchbook.position = "wrong input", TypeError, "Input position is not Point.");
    });

    it('coordinate system isolate', () => {
      let sketchbook1 = new Sketchbook();
      let sketchbook2 = new Sketchbook();
      sketchbook2.scale(2, 2);

      assert.strictEqual(sketchbook1._cs._xScale, 1);
      assert.strictEqual(sketchbook2._cs._yScale, 2);
    });

    it('scale', () => {
      let xScale = 2;
      let yScale = 2;
      let matrix = new CanvasMatrix(xScale, 0, 0, yScale, 0, 0);

      sketchbook.scale(xScale, yScale);
      assert.strictEqual(sketchbook._cs._xScale, xScale);
      assert.strictEqual(sketchbook._cs._yScale, yScale);
      assert.isTrue(sketchbook._cs._basis.equal(matrix));
    });

    it('rotate cw', () => {
      let radian = 90 * Math.PI / 180;
      let a = Math.cos(radian);
      let b = Math.sin(radian);
      let c = -Math.sin(radian);
      let d = Math.cos(radian);
      let matrix = new CanvasMatrix(a, b, c, d, 0, 0);

      assert.strictEqual(sketchbook.getOption("orientation"), ORIENTATION.CW);
      sketchbook.rotate(radian);
      assert.strictEqual(sketchbook._cs._radian, radian);
      assert.isTrue(sketchbook._cs._basis.equal(matrix));
    });

    it('rotate ccw', () => {
      let radian = 90 * Math.PI / 180;
      let a = Math.cos(radian);
      let b = -Math.sin(radian);
      let c = Math.sin(radian);
      let d = Math.cos(radian);
      let matrix = new CanvasMatrix(a, b, c, d, 0, 0);

      sketchbook.setOption("orientation", ORIENTATION.CCW);
      assert.strictEqual(sketchbook.getOption("orientation"), ORIENTATION.CCW);
      sketchbook.rotate(radian);
      assert.strictEqual(sketchbook._cs._radian, radian);
      assert.isTrue(sketchbook._cs._basis.equal(matrix));
    });

    it('translate', () => {
      let position = new Point([3, 4]);
      let matrix = new CanvasMatrix(1, 0, 0, 1, position.x, position.y);

      sketchbook.translate(position.x, position.y);
      assert.strictEqual(sketchbook._cs._position.x, position.x);
      assert.strictEqual(sketchbook._cs._position.y, position.y);
      assert.isTrue(sketchbook._cs._basis.equal(matrix));
    });

    it('compare with svgMatrix - SRT', () => {
      let radian = -10 * Math.PI / 180;

      let canvasSvg = document.createElement('canvas');
      let canvasSvgCtx = canvasSvg.getContext('2d');
      trackTransforms(canvasSvgCtx);

      canvasSvgCtx.scale(1, 2);
      canvasSvgCtx.translate(30, 20);
      canvasSvgCtx.rotate(radian);

      let canvasSketchbook = new Sketchbook();

      canvasSketchbook.scale(1, 2);
      canvasSketchbook.translate(30, 20);
      canvasSketchbook.rotate(radian);

      checkMatrix(canvasSvgCtx.getTransform(), canvasSketchbook._cs._basis);
    });

    it('compare with svgMatrix - TSR', () => {
      let radian = -10 * Math.PI / 180;

      let canvasSvg = document.createElement('canvas');
      let canvasSvgCtx = canvasSvg.getContext('2d');
      trackTransforms(canvasSvgCtx);

      canvasSvgCtx.translate(30, 20);
      canvasSvgCtx.scale(1, 2);
      canvasSvgCtx.rotate(radian);

      let canvasSketchbook = new Sketchbook();

      canvasSketchbook.translate(30, 20);
      canvasSketchbook.scale(1, 2);
      canvasSketchbook.rotate(radian);

      checkMatrix(canvasSvgCtx.getTransform(), canvasSketchbook._cs._basis);
    });

    it('compare with svgMatrix - CRT', () => {
      let radian = -10 * Math.PI / 180;

      let canvasSvg = document.createElement('canvas');
      let canvasSvgCtx = canvasSvg.getContext('2d');
      trackTransforms(canvasSvgCtx);

      canvasSvgCtx.scale(1, 2);
      canvasSvgCtx.rotate(radian);
      canvasSvgCtx.translate(30, 20);

      let canvasSketchbook = new Sketchbook();

      canvasSketchbook.scale(1, 2);
      canvasSketchbook.rotate(radian);
      canvasSketchbook.translate(30, 20);

      checkMatrix(canvasSvgCtx.getTransform(), canvasSketchbook._cs._basis);
    });

    function checkMatrix(svgMatrix, canvasMatrix) {
      assert.strictEqual(svgMatrix.a, canvasMatrix.a);
      assert.strictEqual(svgMatrix.b, canvasMatrix.b);
      assert.strictEqual(svgMatrix.c, canvasMatrix.c);
      assert.strictEqual(svgMatrix.d, canvasMatrix.d);
      assert.strictEqual(svgMatrix.e, canvasMatrix.e);
      assert.strictEqual(svgMatrix.f, canvasMatrix.f);
    }

    function trackTransforms(ctx) {
      let svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
      let xform = svg.createSVGMatrix();
      ctx.getTransform = function () {
        return xform;
      };

      let savedTransforms = [];
      let save = ctx.save;
      ctx.save = function () {
        savedTransforms.push(xform.translate(0, 0));
        return save.call(ctx);
      };
      let restore = ctx.restore;
      ctx.restore = function () {
        xform = savedTransforms.pop();
        return restore.call(ctx);
      };

      let scale = ctx.scale;
      ctx.scale = function (sx, sy) {
        xform = xform.scaleNonUniform(sx, sy);
        return scale.call(ctx, sx, sy);
      };
      let rotate = ctx.rotate;
      ctx.rotate = function (radians) {
        xform = xform.rotate(radians * 180 / Math.PI);
        return rotate.call(ctx, radians);
      };
      let translate = ctx.translate;
      ctx.translate = function (dx, dy) {
        xform = xform.translate(dx, dy);
        return translate.call(ctx, dx, dy);
      };
      let transform = ctx.transform;
      ctx.transform = function (a, b, c, d, e, f) {
        let m2 = svg.createSVGMatrix();
        m2.a = a;
        m2.b = b;
        m2.c = c;
        m2.d = d;
        m2.e = e;
        m2.f = f;
        xform = xform.multiply(m2);
        return transform.call(ctx, a, b, c, d, e, f);
      };
      let setTransform = ctx.setTransform;
      ctx.setTransform = function (a, b, c, d, e, f) {
        xform.a = a;
        xform.b = b;
        xform.c = c;
        xform.d = d;
        xform.e = e;
        xform.f = f;
        return setTransform.call(ctx, a, b, c, d, e, f);
      };
      let pt = svg.createSVGPoint();
      ctx.transformedPoint = function (x, y) {
        pt.x = x;
        pt.y = y;
        return pt.matrixTransform(xform.inverse());
      };
    }

    it('add', () => {
      let object = {
        render: ()=> {
        }
      };
      let lenderList = sketchbook._renderList;

      sketchbook.add(object);
      assert.strictEqual(lenderList[lenderList.length - 1], object);
    });

    it('add without object', () => {
      assert.throws(()=>sketchbook.add(), Error, "Cannot found object.");
    });

    it('add with empty object', () => {
      let object = {};
      assert.throws(()=>sketchbook.add(object), Error, "This object doesn't have render method.");
    });

    it('add with render is not function', () => {
      let object = {
        render: 1
      };
      assert.throws(()=>sketchbook.add(object), Error, "The render method isn't a function.");
    });

    it('render with wrong type', () => {
      let wrong = {};
      assert.throws(()=>sketchbook.render(wrong), TypeError, "Input wrong parameter.(Different class)");
    });

    it('get origin with ORIGIN.LEFT_TOP option', () => {
      sketchbook.position = new Point([100, 50]);
      let position = sketchbook._getOrigin();

      assert.strictEqual(position.x, 100);
      assert.strictEqual(position.y, 50);
    });

    it('get origin with ORIGIN.CENTER option', () => {
      sketchbook.position = new Point([100, 50]);
      sketchbook.setOption("origin", ORIGIN.CENTER);

      sketchbook.width = 50;
      sketchbook.height = 50;
      let position = sketchbook._getOrigin();

      assert.strictEqual(position.x, 75);
      assert.strictEqual(position.y, 25);
    });
  });
});
