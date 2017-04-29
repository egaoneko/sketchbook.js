import chai from "chai";
import Sketchbook from "../src/sketchbook";
import CanvasMatrix from "../src/objects/canvas_matrix";
import Point from "../src/objects/point";
import ORIENTATION from "../src/global/orientation";

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
	});

	describe('options', () => {
		it('get option orientation', () => {
			assert.strictEqual(sketchbook.getOption("orientation"), ORIENTATION.CW);
		});

		it('set option', () => {
			sketchbook.setOption("orientation", ORIENTATION.CCW);
			assert.strictEqual(sketchbook._cs._opt.orientation, ORIENTATION.CCW);
		});
	});

	describe('methods', () => {
		it('construct Sketchbook get about width', () => {
			let width = 500;
			let canvasElement = document.createElement('canvas');
			canvasElement.width = width;
			sketchbook = new Sketchbook(canvasElement);
			assert.strictEqual(sketchbook.width, width);
		});

		it('construct Sketchbook get about height', () => {
			let height = 500;
			let canvasElement = document.createElement('canvas');
			canvasElement.height = height;
			sketchbook = new Sketchbook(canvasElement);
			assert.strictEqual(sketchbook.height, height);
		});

		it('construct Sketchbook set about width', () => {
			let width = 500;
			let canvasElement = document.createElement('canvas');
			sketchbook = new Sketchbook(canvasElement);
			sketchbook.width = width;
			assert.strictEqual(sketchbook.width, width);
		});

		it('construct Sketchbook set about height', () => {
			let height = 500;
			let canvasElement = document.createElement('canvas');
			sketchbook = new Sketchbook(canvasElement);
			sketchbook.height = height;
			assert.strictEqual(sketchbook.height, height);
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

		function checkMatrix (svgMatrix, canvasMatrix) {
			assert.strictEqual(svgMatrix.a, canvasMatrix.a);
			assert.strictEqual(svgMatrix.b, canvasMatrix.b);
			assert.strictEqual(svgMatrix.c, canvasMatrix.c);
			assert.strictEqual(svgMatrix.d, canvasMatrix.d);
			assert.strictEqual(svgMatrix.e, canvasMatrix.e);
			assert.strictEqual(svgMatrix.f, canvasMatrix.f);
		}

		function trackTransforms (ctx) {
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
	});
});
