import chai from "chai";
import CanvasMatrix from "../../src/objects/canvas_matrix";
import {Matrix} from "sylvester-es6";

let assert = chai.assert;

describe('CanvasMatrix', () => {
	let canvasMatrix = null;

	beforeEach(function () {
		canvasMatrix = new CanvasMatrix();
	});

	describe('initialized CanvasMatrix', () => {
		it('check size', () => {
			assert.strictEqual(canvasMatrix.rows().length, 3);
			assert.strictEqual(canvasMatrix.cols().length, 3);
		});

		it('initialized CanvasMatrix', () => {
			assert.strictEqual(canvasMatrix.a, 1);
			assert.strictEqual(canvasMatrix.b, 0);
			assert.strictEqual(canvasMatrix.c, 0);
			assert.strictEqual(canvasMatrix.d, 1);
			assert.strictEqual(canvasMatrix.e, 0);
			assert.strictEqual(canvasMatrix.f, 0);
		});
	});

	describe('set elements', () => {
		it('check size', () => {
		});

		it('initialized CanvasMatrix', () => {
		});
	});
});
