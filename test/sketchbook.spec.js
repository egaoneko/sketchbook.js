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
			assert.isTrue(sketchbook._cs._scaleMatrix.equal(matrix));
		});

		it('rotate cw', () => {
			let radian = 90 * Math.PI / 180;
			let a = Math.cos(radian);
			let b = -Math.sin(radian);
			let c = Math.sin(radian);
			let d = Math.cos(radian);
			let matrix = new CanvasMatrix(a, b, c, d, 0, 0);

			assert.strictEqual(sketchbook.getOption("orientation"), ORIENTATION.CW);
			sketchbook.rotate(radian);
			assert.strictEqual(sketchbook._cs._radian, radian);
			assert.isTrue(sketchbook._cs._rotateMatrix.equal(matrix));
		});

		it('rotate ccw', () => {
			let radian = 90 * Math.PI / 180;
			let a = Math.cos(radian);
			let b = Math.sin(radian);
			let c = -Math.sin(radian);
			let d = Math.cos(radian);
			let matrix = new CanvasMatrix(a, b, c, d, 0, 0);

			sketchbook.setOption("orientation", ORIENTATION.CCW);
			assert.strictEqual(sketchbook.getOption("orientation"), ORIENTATION.CCW);
			sketchbook.rotate(radian);
			assert.strictEqual(sketchbook._cs._radian, radian);
			assert.isTrue(sketchbook._cs._rotateMatrix.equal(matrix));
		});

		it('translate', () => {
			let position = new Point([3, 4]);
			let matrix = new CanvasMatrix(1, 0, 0, 1, position.x, position.y);

			sketchbook.translate(position.x, position.y);
			assert.strictEqual(sketchbook._cs._position.x, position.x);
			assert.strictEqual(sketchbook._cs._position.y, position.y);
			assert.isTrue(sketchbook._cs._translateMatrix.equal(matrix));
		});
	});
});
