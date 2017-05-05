import chai from "chai";
import Shape from "../../src/shapes/shape";
import Point from "../../src/objects/point";
import CanvasMatrix from "../../src/objects/canvas_matrix";
import Sketchbook from "../../src/sketchbook";
import {ORIENTATION} from "../../src/global/global";

let assert = chai.assert;

describe('Shape', () => {
  let shape;

  beforeEach(function () {
    shape = new Shape();
  });

  describe('initialized Shape', () => {
    it('initialized fillStyle', () => {
      assert.strictEqual(shape._opt.fillStyle, '#000000');
    });

    it('initialized strokeStyle', () => {
      assert.strictEqual(shape._opt.strokeStyle, '#000000');
    });

    it('initialized shadowColor', () => {
      assert.strictEqual(shape._opt.shadowColor, '#000000');
    });

    it('initialized shadowBlur', () => {
      assert.strictEqual(shape._opt.shadowBlur, 0);
    });

    it('initialized shadowOffsetX ', () => {
      assert.strictEqual(shape._opt.shadowOffsetX, 0);
    });

    it('initialized shadowOffsetY', () => {
      assert.strictEqual(shape._opt.shadowOffsetY, 0);
    });

    it('initialized lineCap', () => {
      assert.strictEqual(shape._opt.lineCap, 'butt');
    });

    it('initialized lineJoin', () => {
      assert.strictEqual(shape._opt.lineJoin, 'miter');
    });

    it('initialized lineWidth', () => {
      assert.strictEqual(shape._opt.lineWidth, 1);
    });

    it('initialized miterLimit', () => {
      assert.strictEqual(shape._opt.miterLimit, 10);
    });

    it('initialized globalAlpha', () => {
      assert.strictEqual(shape._opt.globalAlpha, 1.0);
    });

    it('initialized globalCompositeOperation', () => {
      assert.strictEqual(shape._opt.globalCompositeOperation, 'source-over');
    });

    it('initialized x', () => {
      assert.strictEqual(shape._opt.x, 0);
    });

    it('initialized y', () => {
      assert.strictEqual(shape._opt.y, 0);
    });

    it('initialized position', () => {
      assert.strictEqual(shape._position.x, 0);
      assert.strictEqual(shape._position.y, 0);
    });

    it('initialized visible', () => {
      assert.strictEqual(shape._opt.visible, true);
    });
  });

  describe('options', () => {
    it('initialized set options', () => {
      shape = new Shape({
        fillStyle: '#ffffff',
        strokeStyle: '#ffffff',
        shadowColor: '#ffffff',
        shadowBlur: 20,
        shadowOffsetX: 20,
        shadowOffsetY: 20,
        lineCap: 'round',
        lineJoin: 'bevel',
        lineWidth: 10,
        miterLimit: 5,
        globalAlpha: 0.0,
        globalCompositeOperation: 'destination-over',
        x: 10,
        y: 20,
        visible: false,
        orientation: ORIENTATION.CCW
      });
      assert.strictEqual(shape.fillStyle, '#ffffff');
      assert.strictEqual(shape.strokeStyle, '#ffffff');
      assert.strictEqual(shape.shadowColor, '#ffffff');
      assert.strictEqual(shape.shadowBlur, 20);
      assert.strictEqual(shape.shadowOffsetX, 20);
      assert.strictEqual(shape.shadowOffsetY, 20);
      assert.strictEqual(shape.lineCap, 'round');
      assert.strictEqual(shape.lineJoin, 'bevel');
      assert.strictEqual(shape.lineWidth, 10);
      assert.strictEqual(shape.miterLimit, 5);
      assert.strictEqual(shape.globalAlpha, 0.0);
      assert.strictEqual(shape.globalCompositeOperation, 'destination-over');
      assert.strictEqual(shape.x, 10);
      assert.strictEqual(shape.y, 20);
      assert.strictEqual(shape.visible, false);
      assert.strictEqual(shape._cs._opt.orientation, ORIENTATION.CCW);
    });

    it('get options', () => {
      let options = {
        fillStyle: '#ffffff',
        strokeStyle: '#ffffff',
        shadowColor: '#ffffff',
        shadowBlur: 20,
        shadowOffsetX: 20,
        shadowOffsetY: 20,
        lineCap: 'round',
        lineJoin: 'bevel',
        lineWidth: 10,
        miterLimit: 5,
        globalAlpha: 0.0,
        globalCompositeOperation: 'destination-over',
        x: 10,
        y: 20,
        visible: false,
        orientation: ORIENTATION.CCW
      };

      shape = new Shape(options);
      assert.deepEqual(shape.getOptions(), options);
    });

    it('get options isolate', () => {
      let options = shape.getOptions();
      options.fillStyle = '#ffffff';
      assert.notStrictEqual(shape._opt.fillStyle, '#ffffff');
    });

    it('set options', () => {
      let expected = {
        fillStyle: '#ffffff',
        strokeStyle: '#ffffff',
        shadowColor: '#ffffff',
        shadowBlur: 20,
        shadowOffsetX: 20,
        shadowOffsetY: 20,
        lineCap: 'round',
        lineJoin: 'bevel',
        lineWidth: 10,
        miterLimit: 5,
        globalAlpha: 0.0,
        globalCompositeOperation: 'destination-over',
        x: 10,
        y: 20,
        visible: false,
        orientation: ORIENTATION.CCW
      };

      shape.setOptions(expected);

      let actual = shape.getOptions();
      assert.deepEqual(actual, expected);
    });

    it('set options isolate', () => {
      let options = {
        fillStyle: '#ffffff'
      };

      shape = new Shape(options);
      options.fillStyle = '#000000';
      assert.notStrictEqual(shape._opt.fillStyle, '#000000');
    });

    describe('orientation', () => {
      it('get option orientation', () => {
        assert.strictEqual(shape.getOption("orientation"), ORIENTATION.CW);
      });

      it('set option orientation', () => {
        shape.setOption("orientation", ORIENTATION.CCW);
        assert.strictEqual(shape._cs._opt.orientation, ORIENTATION.CCW);
      });
    });
  });

  describe('methods', () => {
    it('get fillStyle', () => {
      assert.strictEqual(shape.fillStyle, '#000000');
    });

    it('set fillStyle', () => {
      shape.fillStyle = '#ffffff';
      assert.strictEqual(shape.fillStyle, '#ffffff');
    });

    it('get strokeStyle', () => {
      assert.strictEqual(shape.strokeStyle, '#000000');
    });

    it('set strokeStyle', () => {
      shape.strokeStyle = '#ffffff';
      assert.strictEqual(shape.strokeStyle, '#ffffff');
    });

    it('get shadowColor', () => {
      assert.strictEqual(shape.shadowColor, '#000000');
    });

    it('set shadowColor', () => {
      shape.shadowColor = '#ffffff';
      assert.strictEqual(shape.shadowColor, '#ffffff');
    });

    it('get shadowBlur', () => {
      assert.strictEqual(shape.shadowBlur, 0);
    });

    it('set shadowBlur', () => {
      shape.shadowBlur = 20;
      assert.strictEqual(shape.shadowBlur, 20);
    });

    it('get shadowOffsetX', () => {
      assert.strictEqual(shape.shadowOffsetX, 0);
    });

    it('set shadowOffsetX', () => {
      shape.shadowOffsetX = 20;
      assert.strictEqual(shape.shadowOffsetX, 20);
    });

    it('get shadowOffsetY', () => {
      assert.strictEqual(shape.shadowOffsetY, 0);
    });

    it('set shadowOffsetY', () => {
      shape.shadowOffsetY = 20;
      assert.strictEqual(shape.shadowOffsetY, 20);
    });

    it('get lineCap', () => {
      assert.strictEqual(shape.lineCap, 'butt');
    });

    it('set lineCap', () => {
      shape.lineCap = 'round';
      assert.strictEqual(shape.lineCap, 'round');
    });

    it('get lineJoin', () => {
      assert.strictEqual(shape.lineJoin, 'miter');
    });

    it('set lineJoin', () => {
      shape.lineJoin = 'bevel';
      assert.strictEqual(shape.lineJoin, 'bevel');
    });

    it('get lineWidth', () => {
      assert.strictEqual(shape.lineWidth, 1);
    });

    it('set lineWidth', () => {
      shape.lineWidth = 10;
      assert.strictEqual(shape.lineWidth, 10);
    });

    it('get miterLimit', () => {
      assert.strictEqual(shape.miterLimit, 10);
    });

    it('set miterLimit', () => {
      shape.miterLimit = 5;
      assert.strictEqual(shape.miterLimit, 5);
    });

    it('get globalAlpha', () => {
      assert.strictEqual(shape.globalAlpha, 1.0);
    });

    it('set globalAlpha', () => {
      shape.globalAlpha = 0.0;
      assert.strictEqual(shape.globalAlpha, 0.0);
    });

    it('get globalCompositeOperation', () => {
      assert.strictEqual(shape.globalCompositeOperation, 'source-over');
    });

    it('set globalCompositeOperation', () => {
      shape.globalCompositeOperation = 'destination-over';
      assert.strictEqual(shape.globalCompositeOperation, 'destination-over');
    });

    it('get x', () => {
      assert.strictEqual(shape.x, 0);
    });

    it('set x', () => {
      shape.x = 20;
      assert.strictEqual(shape.x, 20);
      assert.strictEqual(shape._position.x, 20);
      assert.strictEqual(shape._position.y, 0);
    });

    it('get y', () => {
      assert.strictEqual(shape.y, 0);
    });

    it('set y', () => {
      shape.y = 20;
      assert.strictEqual(shape.y, 20);
      assert.strictEqual(shape._position.x, 0);
      assert.strictEqual(shape._position.y, 20);
    });

    it('get position', () => {
      assert.strictEqual(shape.position.x, 0);
      assert.strictEqual(shape.position.y, 0);
    });

    it('set position', () => {
      shape.position = new Point([3, 4]);

      assert.strictEqual(shape._opt.x, 3);
      assert.strictEqual(shape._opt.y, 4);
      assert.strictEqual(shape.position.x, 3);
      assert.strictEqual(shape.position.y, 4);
    });

    it('set position with wrong input', () => {
      assert.throws(()=>shape.position = "wrong input", TypeError, "Input position is not Point.");
    });

    it('get visible', () => {
      assert.strictEqual(shape.visible, true);
    });

    it('set visible', () => {
      shape.visible = false;
      assert.strictEqual(shape.visible, false);
    });

    it('coordinate system isolate', () => {
      let shape1 = new Shape();
      let shape2 = new Shape();
      shape2.scale(2, 2);

      assert.strictEqual(shape1._cs._xScale, 1);
      assert.strictEqual(shape2._cs._yScale, 2);
    });

    it('scale', () => {
      let xScale = 2;
      let yScale = 2;
      let matrix = new CanvasMatrix(xScale, 0, 0, yScale, 0, 0);

      shape.scale(xScale, yScale);
      assert.strictEqual(shape._cs._xScale, xScale);
      assert.strictEqual(shape._cs._yScale, yScale);
      assert.isTrue(shape._cs._basis.equal(matrix));
    });

    it('rotate cw', () => {
      let radian = 90 * Math.PI / 180;
      let a = Math.cos(radian);
      let b = Math.sin(radian);
      let c = -Math.sin(radian);
      let d = Math.cos(radian);
      let matrix = new CanvasMatrix(a, b, c, d, 0, 0);

      assert.strictEqual(shape.getOption("orientation"), ORIENTATION.CW);
      shape.rotate(radian);
      assert.strictEqual(shape._cs._radian, radian);
      assert.isTrue(shape._cs._basis.equal(matrix));
    });

    it('rotate ccw', () => {
      let radian = 90 * Math.PI / 180;
      let a = Math.cos(radian);
      let b = -Math.sin(radian);
      let c = Math.sin(radian);
      let d = Math.cos(radian);
      let matrix = new CanvasMatrix(a, b, c, d, 0, 0);

      shape.setOption("orientation", ORIENTATION.CCW);
      assert.strictEqual(shape.getOption("orientation"), ORIENTATION.CCW);
      shape.rotate(radian);
      assert.strictEqual(shape._cs._radian, radian);
      assert.isTrue(shape._cs._basis.equal(matrix));
    });

    it('translate', () => {
      let position = new Point([3, 4]);
      let matrix = new CanvasMatrix(1, 0, 0, 1, position.x, position.y);

      shape.translate(position.x, position.y);
      assert.strictEqual(shape._cs._position.x, position.x);
      assert.strictEqual(shape._cs._position.y, position.y);
      assert.isTrue(shape._cs._basis.equal(matrix));
    });

    it('call render without override', () => {
      assert.throws(()=>shape.render(), Error, "The render isn't overridden. It need to be overridden.");
    });

    it('validateSketchbook with wrong type', () => {
      let wrong = {};
      assert.throws(()=>shape.validateSketchbook(wrong), TypeError, "Input wrong parameter.(Different class)");
    });

    it('applyOptions', () => {
      let sketchbook = new Sketchbook();
      shape = new Shape({
        fillStyle: '#ffffff',
        strokeStyle: '#ffffff',
        shadowColor: '#ffffff',
        shadowBlur: 20,
        shadowOffsetX: 20,
        shadowOffsetY: 20,
        lineCap: 'round',
        lineJoin: 'bevel',
        lineWidth: 10,
        miterLimit: 5,
        globalAlpha: 0.0,
        globalCompositeOperation: 'destination-over',
      });
      shape.applyOptions(sketchbook);
      assert.strictEqual(sketchbook._context.fillStyle, '#ffffff');
      assert.strictEqual(sketchbook._context.strokeStyle, '#ffffff');
      assert.strictEqual(sketchbook._context.shadowColor, '#ffffff');
      assert.strictEqual(sketchbook._context.shadowBlur, 20);
      assert.strictEqual(sketchbook._context.shadowOffsetX, 20);
      assert.strictEqual(sketchbook._context.shadowOffsetY, 20);
      assert.strictEqual(sketchbook._context.lineCap, 'round');
      assert.strictEqual(sketchbook._context.lineJoin, 'bevel');
      assert.strictEqual(sketchbook._context.lineWidth, 10);
      assert.strictEqual(sketchbook._context.miterLimit, 5);
      assert.strictEqual(sketchbook._context.globalAlpha, 0.0);
      assert.strictEqual(sketchbook._context.globalCompositeOperation, 'destination-over');
    });

    it('applyOptions with wrong type', () => {
      let wrong = {};
      assert.throws(()=>shape.applyOptions(wrong), TypeError, "Input wrong parameter.(Different class)");
    });

    it('resetOptions', () => {
      let sketchbook = new Sketchbook();
      shape = new Shape({
        fillStyle: '#ffffff',
        strokeStyle: '#ffffff',
        shadowColor: '#ffffff',
        shadowBlur: 20,
        shadowOffsetX: 20,
        shadowOffsetY: 20,
        lineCap: 'round',
        lineJoin: 'bevel',
        lineWidth: 10,
        miterLimit: 5,
        globalAlpha: 0.0,
        globalCompositeOperation: 'destination-over',
      });
      shape.resetOptions(sketchbook);
      assert.strictEqual(sketchbook._context.fillStyle, shape._defaultCanvasOpt.fillStyle);
      assert.strictEqual(sketchbook._context.strokeStyle, shape._defaultCanvasOpt.strokeStyle);
      assert.strictEqual(sketchbook._context.shadowColor, shape._defaultCanvasOpt.shadowColor);
      assert.strictEqual(sketchbook._context.shadowBlur, shape._defaultCanvasOpt.shadowBlur);
      assert.strictEqual(sketchbook._context.shadowOffsetX, shape._defaultCanvasOpt.shadowOffsetX);
      assert.strictEqual(sketchbook._context.shadowOffsetY, shape._defaultCanvasOpt.shadowOffsetY);
      assert.strictEqual(sketchbook._context.lineCap, shape._defaultCanvasOpt.lineCap);
      assert.strictEqual(sketchbook._context.lineJoin, shape._defaultCanvasOpt.lineJoin);
      assert.strictEqual(sketchbook._context.lineWidth, shape._defaultCanvasOpt.lineWidth);
      assert.strictEqual(sketchbook._context.miterLimit, shape._defaultCanvasOpt.miterLimit);
      assert.strictEqual(sketchbook._context.globalAlpha, shape._defaultCanvasOpt.globalAlpha);
      assert.strictEqual(sketchbook._context.globalCompositeOperation, shape._defaultCanvasOpt.globalCompositeOperation);
    });

    it('resetOptions with wrong type', () => {
      let wrong = {};
      assert.throws(()=>shape.resetOptions(wrong), TypeError, "Input wrong parameter.(Different class)");
    });
  });
});
