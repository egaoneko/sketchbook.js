import _ from "lodash";
import chai from "chai";
import Shape from "../../src/shapes/shape";
import Point from "../../src/objects/point";
import CanvasMatrix from "../../src/objects/canvas_matrix";
import Sketchbook from "../../src/sketchbook";
import {ORIENTATION} from "../../src/enums/global";

let assert = chai.assert;

describe('Shape', () => {
  let shape;
  let pivot;

  beforeEach(() => {
    shape = new Shape();
    pivot = new Point([3, 4]);
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

    it('initialized isFilled', () => {
      assert.strictEqual(shape._opt.isFilled, false);
    });

    it('initialized isStroked', () => {
      assert.strictEqual(shape._opt.isStroked, true);
    });

    it('initialized uuid', () => {
      let groupSizes = [8, 4, 4, 4, 12];
      let uuid = shape._uuid;
      let groups = uuid.split('-');
      assert.strictEqual(groups.length, 5);

      _.each(_.range(5), index => {
        assert.strictEqual(groups[index].length, groupSizes[index]);
      });
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
        isFilled: true,
        isStroked: false,
        orientation: ORIENTATION.CCW
      });
      assert.strictEqual(shape._opt.fillStyle, '#ffffff');
      assert.strictEqual(shape._opt.strokeStyle, '#ffffff');
      assert.strictEqual(shape._opt.shadowColor, '#ffffff');
      assert.strictEqual(shape._opt.shadowBlur, 20);
      assert.strictEqual(shape._opt.shadowOffsetX, 20);
      assert.strictEqual(shape._opt.shadowOffsetY, 20);
      assert.strictEqual(shape._opt.lineCap, 'round');
      assert.strictEqual(shape._opt.lineJoin, 'bevel');
      assert.strictEqual(shape._opt.lineWidth, 10);
      assert.strictEqual(shape._opt.miterLimit, 5);
      assert.strictEqual(shape._opt.globalAlpha, 0.0);
      assert.strictEqual(shape._opt.globalCompositeOperation, 'destination-over');
      assert.strictEqual(shape._opt.x, 10);
      assert.strictEqual(shape._opt.y, 20);
      assert.strictEqual(shape._opt.visible, false);
      assert.strictEqual(shape._cs._opt.orientation, ORIENTATION.CCW);
    });

    it('get option', () => {
      assert.strictEqual(shape.getOption('fillStyle'), "#000000");
      shape = new Shape({
        fillStyle: '#ffffff'
      });
      assert.strictEqual(shape.getOption('fillStyle'), "#ffffff");
    });

    it('set option', () => {
      assert.strictEqual(shape.getOption('fillStyle'), "#000000");
      shape.setOption('fillStyle', '#ffffff');
      assert.strictEqual(shape.getOption('fillStyle'), "#ffffff");
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
        isFilled: true,
        isStroked: false,
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
        isFilled: true,
        isStroked: false,
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
      assert.strictEqual(shape._opt.fillStyle, '#ffffff');
    });

    it('get strokeStyle', () => {
      assert.strictEqual(shape.strokeStyle, '#000000');
    });

    it('set strokeStyle', () => {
      shape.strokeStyle = '#ffffff';
      assert.strictEqual(shape._opt.strokeStyle, '#ffffff');
    });

    it('get shadowColor', () => {
      assert.strictEqual(shape.shadowColor, '#000000');
    });

    it('set shadowColor', () => {
      shape.shadowColor = '#ffffff';
      assert.strictEqual(shape._opt.shadowColor, '#ffffff');
    });

    it('get shadowBlur', () => {
      assert.strictEqual(shape.shadowBlur, 0);
    });

    it('set shadowBlur', () => {
      shape.shadowBlur = 20;
      assert.strictEqual(shape._opt.shadowBlur, 20);
    });

    it('get shadowOffsetX', () => {
      assert.strictEqual(shape.shadowOffsetX, 0);
    });

    it('set shadowOffsetX', () => {
      shape.shadowOffsetX = 20;
      assert.strictEqual(shape._opt.shadowOffsetX, 20);
    });

    it('get shadowOffsetY', () => {
      assert.strictEqual(shape.shadowOffsetY, 0);
    });

    it('set shadowOffsetY', () => {
      shape.shadowOffsetY = 20;
      assert.strictEqual(shape._opt.shadowOffsetY, 20);
    });

    it('get lineCap', () => {
      assert.strictEqual(shape.lineCap, 'butt');
    });

    it('set lineCap', () => {
      shape.lineCap = 'round';
      assert.strictEqual(shape._opt.lineCap, 'round');
    });

    it('get lineJoin', () => {
      assert.strictEqual(shape.lineJoin, 'miter');
    });

    it('set lineJoin', () => {
      shape.lineJoin = 'bevel';
      assert.strictEqual(shape._opt.lineJoin, 'bevel');
    });

    it('get lineWidth', () => {
      assert.strictEqual(shape.lineWidth, 1);
    });

    it('set lineWidth', () => {
      shape.lineWidth = 10;
      assert.strictEqual(shape._opt.lineWidth, 10);
    });

    it('get miterLimit', () => {
      assert.strictEqual(shape.miterLimit, 10);
    });

    it('set miterLimit', () => {
      shape.miterLimit = 5;
      assert.strictEqual(shape._opt.miterLimit, 5);
    });

    it('get globalAlpha', () => {
      assert.strictEqual(shape.globalAlpha, 1.0);
    });

    it('set globalAlpha', () => {
      shape.globalAlpha = 0.0;
      assert.strictEqual(shape._opt.globalAlpha, 0.0);
    });

    it('get opacity', () => {
      assert.strictEqual(shape.opacity, shape._opt.globalAlpha);
    });

    it('set opacity', () => {
      shape.opacity = 0.0;
      assert.strictEqual(shape._opt.globalAlpha, 0.0);
    });

    it('get globalCompositeOperation', () => {
      assert.strictEqual(shape.globalCompositeOperation, 'source-over');
    });

    it('set globalCompositeOperation', () => {
      shape.globalCompositeOperation = 'destination-over';
      assert.strictEqual(shape._opt.globalCompositeOperation, 'destination-over');
    });

    it('get x', () => {
      assert.strictEqual(shape.x, 0);
    });

    it('set x', () => {
      shape.x = 20;
      assert.strictEqual(shape._opt.x, 20);
      assert.strictEqual(shape._position.x, 20);
      assert.strictEqual(shape._position.y, 0);
    });

    it('get y', () => {
      assert.strictEqual(shape.y, 0);
    });

    it('set y', () => {
      shape.y = 20;
      assert.strictEqual(shape._opt.y, 20);
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

    it('get xScale', () => {
      assert.strictEqual(shape.xScale, 1);
    });

    it('get yScale', () => {
      assert.strictEqual(shape.yScale, 1);
    });

    it('get radian', () => {
      assert.strictEqual(shape.radian, 0);
    });

    it('set position with wrong input', () => {
      assert.throws(()=>shape.position = "wrong input", TypeError, "Input position is not Point.");
    });

    it('get basis', () => {
      assert.isTrue(shape.basis.equal(shape._cs.basis));
    });

    it('get visible', () => {
      assert.strictEqual(shape.visible, true);
    });

    it('set visible', () => {
      shape.visible = false;
      assert.strictEqual(shape._opt.visible, false);
    });

    it('get isFilled', () => {
      assert.strictEqual(shape.isFilled, false);
    });

    it('set isFilled', () => {
      shape.isFilled = true;
      assert.strictEqual(shape._opt.isFilled, true);
    });

    it('get isStroked', () => {
      assert.strictEqual(shape.isStroked, true);
    });

    it('set isStroked', () => {
      shape.isStroked = false;
      assert.strictEqual(shape._opt.isStroked, false);
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

    it('setScale', () => {
      let xScale = 2;
      let yScale = 2;
      let matrix = new CanvasMatrix(xScale, 0, 0, yScale, 0, 0);

      shape.setScale(xScale, yScale);
      assert.strictEqual(shape._cs._xScale, xScale);
      assert.strictEqual(shape._cs._yScale, yScale);
      assert.isTrue(shape._cs._basis.equal(matrix));
    });

    it('_checkScaleValidate without params', () => {
      assert.throws(()=>shape._checkScaleValidate(), Error, "Both xScale and yScale must be needed.");
      assert.throws(()=>shape._checkScaleValidate(10), Error, "Both xScale and yScale must be needed.");
      assert.throws(()=>shape._checkScaleValidate(null), Error, "Both xScale and yScale must be needed.");
      assert.throws(()=>shape._checkScaleValidate(null, null, pivot), Error, "Both xScale and yScale must be needed.");
      assert.doesNotThrow(()=>shape._checkScaleValidate(10, 10, pivot));
    });

    it('_checkScaleValidate with unnumerical param', () => {
      assert.throws(()=>shape._checkScaleValidate('a', 10, pivot), TypeError, "Both xScale and yScale must be numerical values.");
      assert.throws(()=>shape._checkScaleValidate(10, 'a', pivot), TypeError, "Both xScale and yScale must be numerical values.");
      assert.doesNotThrow(()=>shape._checkScaleValidate(10, 10, pivot));
    });

    it('_checkScaleValidate with minus param', () => {
      assert.throws(()=>shape._checkScaleValidate(-10, 10, pivot), Error, "Both xScale and yScale must be larger than 0.");
      assert.throws(()=>shape._checkScaleValidate(10, -10, pivot), Error, "Both xScale and yScale must be larger than 0.");
      assert.throws(()=>shape._checkScaleValidate(-10, -10, pivot), Error, "Both xScale and yScale must be larger than 0.");
      assert.doesNotThrow(()=>shape._checkScaleValidate(10, 10, pivot));
    });

    it('_checkScaleValidate with wrong type pivot', () => {
      assert.throws(()=>shape._checkScaleValidate(10, 10, {}), Error, "The pivot must be Point.");
      assert.doesNotThrow(()=>shape._checkScaleValidate(10, 10, pivot));
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

    it('setRotate cw', () => {
      let radian = 90 * Math.PI / 180;
      let a = Math.cos(radian);
      let b = Math.sin(radian);
      let c = -Math.sin(radian);
      let d = Math.cos(radian);
      let matrix = new CanvasMatrix(a, b, c, d, 0, 0);

      assert.strictEqual(shape.getOption("orientation"), ORIENTATION.CW);
      shape.setRotate(radian);
      assert.strictEqual(shape._cs._radian, radian);
      assert.isTrue(shape._cs._basis.equal(matrix));
    });

    it('setRotate ccw', () => {
      let radian = 90 * Math.PI / 180;
      let a = Math.cos(radian);
      let b = -Math.sin(radian);
      let c = Math.sin(radian);
      let d = Math.cos(radian);
      let matrix = new CanvasMatrix(a, b, c, d, 0, 0);

      shape.setOption("orientation", ORIENTATION.CCW);
      assert.strictEqual(shape.getOption("orientation"), ORIENTATION.CCW);
      shape.setRotate(radian);
      assert.strictEqual(shape._cs._radian, radian);
      assert.isTrue(shape._cs._basis.equal(matrix));
    });

    it('_checkRotateValidate without params', () => {
      assert.throws(()=>Shape._checkRotateValidate(), Error, "A radian must be needed.");
      assert.throws(()=>Shape._checkRotateValidate(null, pivot), Error, "A radian must be needed.");
      assert.doesNotThrow(()=>Shape._checkRotateValidate(1, pivot));
    });

    it('_checkRotateValidate with unnumerical param', () => {
      assert.throws(()=>Shape._checkRotateValidate('a', pivot), TypeError, "A radian must be numerical values.");
      assert.doesNotThrow(()=>Shape._checkRotateValidate(1, pivot));
    });

    it('_checkRotateValidate with wrong type pivot', () => {
      assert.throws(()=>Shape._checkRotateValidate(1, {}), Error, "The pivot must be Point.");
      assert.doesNotThrow(()=>Shape._checkRotateValidate(1, pivot));
    });

    it('translate', () => {
      let position = new Point([3, 4]);
      let matrix = new CanvasMatrix(1, 0, 0, 1, position.x, position.y);

      shape.translate(position.x, position.y);
      assert.strictEqual(shape._cs._position.x, position.x);
      assert.strictEqual(shape._cs._position.y, position.y);
      assert.isTrue(shape._cs._basis.equal(matrix));
    });

    it('setTranslate', () => {
      let position = new Point([3, 4]);
      let matrix = new CanvasMatrix(1, 0, 0, 1, position.x, position.y);

      shape.setTranslate(position.x, position.y);
      assert.strictEqual(shape._cs._position.x, position.x);
      assert.strictEqual(shape._cs._position.y, position.y);
      assert.isTrue(shape._cs._basis.equal(matrix));
    });

    it('_checkTranslateValidate without params', () => {
      assert.throws(()=>Shape._checkTranslateValidate(), Error, "Both x and y must be needed.");
      assert.throws(()=>Shape._checkTranslateValidate(10), Error, "Both x and y must be needed.");
      assert.throws(()=>Shape._checkTranslateValidate(null), Error, "Both x and y must be needed.");
      assert.throws(()=>Shape._checkTranslateValidate(null, null), Error, "Both x and y must be needed.");
      assert.doesNotThrow(()=>Shape._checkTranslateValidate(10, 10));
    });

    it('_checkTranslateValidate with unnumerical param', () => {
      assert.throws(()=>Shape._checkTranslateValidate('a', 10), TypeError, "Both x and y must be numerical values.");
      assert.throws(()=>Shape._checkTranslateValidate(10, 'a'), TypeError, "Both x and y must be numerical values.");
      assert.doesNotThrow(()=>Shape._checkTranslateValidate(10, 10));
    });

    it('call render without override', () => {
      assert.throws(()=>shape.render(), Error, "The render isn't overridden. It need to be overridden.");
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

    it('applyOptions with fillStyle callback', () => {
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      let grd = ctx.createLinearGradient(0, 0, 10, 10);
      grd.addColorStop(0, "black");
      grd.addColorStop(1, "white");

      let sketchbook = new Sketchbook();
      shape = new Shape({
        fillStyle: (ctx) => {
          let grd = ctx.createLinearGradient(0, 0, 10, 10);
          grd.addColorStop(0, "black");
          grd.addColorStop(1, "white");
          return grd;
        }
      });
      shape.applyOptions(sketchbook);
      assert.deepEqual(grd, sketchbook._context.fillStyle);
    });

    it('applyOptions with strokeStyle callback', () => {
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      let grd = ctx.createLinearGradient(0, 0, 10, 10);
      grd.addColorStop(0, "black");
      grd.addColorStop(1, "white");

      let sketchbook = new Sketchbook();
      shape = new Shape({
        strokeStyle: (ctx) => {
          let grd = ctx.createLinearGradient(0, 0, 10, 10);
          grd.addColorStop(0, "black");
          grd.addColorStop(1, "white");
          return grd;
        }
      });
      shape.applyOptions(sketchbook);
      assert.deepEqual(grd, sketchbook._context.strokeStyle);
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

    it('call render with override', () => {
      shape.render = () => {
      };
      assert.doesNotThrow(()=>shape.render());
    });

    it('renderShape with visible is false', () => {
      // If visible is false, not render.
      let wrong = {};
      shape.visible = false;
      assert.doesNotThrow(()=>shape.renderShape(wrong));
    });
  });

  describe('compare with svgMatrix', () => {
    it('compare with svgMatrix - SRT', () => {
      let radian = -10 * Math.PI / 180;

      let canvasSvg = document.createElement('canvas');
      let canvasSvgCtx = canvasSvg.getContext('2d');
      trackTransforms(canvasSvgCtx);

      canvasSvgCtx.scale(1, 2);
      canvasSvgCtx.translate(30, 20);
      canvasSvgCtx.rotate(radian);

      shape.scale(1, 2);
      shape.translate(30, 20);
      shape.rotate(radian);

      checkMatrix(canvasSvgCtx.getTransform(), shape._cs._basis);
    });

    it('compare with svgMatrix - TSR', () => {
      let radian = -10 * Math.PI / 180;

      let canvasSvg = document.createElement('canvas');
      let canvasSvgCtx = canvasSvg.getContext('2d');
      trackTransforms(canvasSvgCtx);

      canvasSvgCtx.translate(30, 20);
      canvasSvgCtx.scale(1, 2);
      canvasSvgCtx.rotate(radian);

      shape.translate(30, 20);
      shape.scale(1, 2);
      shape.rotate(radian);

      checkMatrix(canvasSvgCtx.getTransform(), shape._cs._basis);
    });

    it('compare with svgMatrix - CRT', () => {
      let radian = -10 * Math.PI / 180;

      let canvasSvg = document.createElement('canvas');
      let canvasSvgCtx = canvasSvg.getContext('2d');
      trackTransforms(canvasSvgCtx);

      canvasSvgCtx.scale(1, 2);
      canvasSvgCtx.rotate(radian);
      canvasSvgCtx.translate(30, 20);

      shape.scale(1, 2);
      shape.rotate(radian);
      shape.translate(30, 20);

      checkMatrix(canvasSvgCtx.getTransform(), shape._cs._basis);
    });

    it('compare with svgMatrix - pivot scale', () => {
      let canvasSvg = document.createElement('canvas');
      let canvasSvgCtx = canvasSvg.getContext('2d');
      trackTransforms(canvasSvgCtx);

      canvasSvgCtx.translate(30, 20);
      canvasSvgCtx.scale(2, 3);
      canvasSvgCtx.translate(-30, -20);

      shape.scale(2, 3, new Point([30, 20]));

      checkMatrix(canvasSvgCtx.getTransform(), shape._cs._basis);
    });

    it('compare with svgMatrix - pivot Rotate', () => {
      let radian = -10 * Math.PI / 180;

      let canvasSvg = document.createElement('canvas');
      let canvasSvgCtx = canvasSvg.getContext('2d');
      trackTransforms(canvasSvgCtx);

      canvasSvgCtx.translate(30, 20);
      canvasSvgCtx.rotate(radian);
      canvasSvgCtx.translate(-30, -20);

      shape.rotate(radian, new Point([30, 20]));

      checkMatrix(canvasSvgCtx.getTransform(), shape._cs._basis);
    });

    function checkMatrix(svgMatrix, canvasMatrix) {
      let closeTo = 1e-09;
      assert.approximately(svgMatrix.a, canvasMatrix.a, closeTo);
      assert.approximately(svgMatrix.b, canvasMatrix.b, closeTo);
      assert.approximately(svgMatrix.c, canvasMatrix.c, closeTo);
      assert.approximately(svgMatrix.d, canvasMatrix.d, closeTo);
      assert.approximately(svgMatrix.e, canvasMatrix.e, closeTo);
      assert.approximately(svgMatrix.f, canvasMatrix.f, closeTo);
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
  });
});
