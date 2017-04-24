import chai from "chai";
import CoordinateSystem from "../../src/mixins/coordinate_system";
import CanvasMatrix from "../../src/objects/canvas_matrix";
import Point from "../../src/objects/point";

let assert = chai.assert;

describe('CoordinateSystem', () => {
	let cs = null;

	beforeEach(function () {
		cs = new CoordinateSystem();
	});

	describe('initialized CoordinateSystem', () => {
		it('initialized position', () => {
			let position = cs._position;
			assert.strictEqual(position.x, 0);
			assert.strictEqual(position.y, 0);
		});

		it('initialized scale', () => {
			let scale = cs._scale;
			assert.strictEqual(scale, 1);
		});

		it('initialized radian', () => {
			let radian = cs._radian;
			assert.strictEqual(radian, 0.0);
		});

		it('initialized matrix', () => {
			checkMatrix(cs._scaleMatrix);
			checkMatrix(cs._rotateMatrix);
			checkMatrix(cs._translateMatrix);
			checkMatrix(cs._basis);
		});
	});

	it('scale', () => {
		let scale = 2;
		let matrix = new CanvasMatrix(scale, 0, 0, scale, 0, 0);

		assert.isFalse(cs._isNeedToUpdate);
		cs.scale(scale);
		assert.strictEqual(cs._scale, scale);
		assert.isTrue(cs._scaleMatrix.equal(matrix));
		assert.isTrue(cs._isNeedToUpdate);
	});

	it('rotate', () => {
		let radian = 90 * Math.PI / 180;
		let a = Math.cos(radian);
		let b = Math.sin(radian);
		let c = -Math.sin(radian);
		let d = Math.cos(radian);
		let matrix = new CanvasMatrix(a, b, c, d, 0, 0);

		assert.isFalse(cs._isNeedToUpdate);
		cs.rotate(radian);
		assert.strictEqual(cs._radian, radian);
		assert.isTrue(cs._rotateMatrix.equal(matrix));
		assert.isTrue(cs._isNeedToUpdate);
	});

	it('translate', () => {
		let position = new Point([3, 4]);
		let matrix = new CanvasMatrix(1, 0, 0, 1, -position.x, -position.y);

		assert.isFalse(cs._isNeedToUpdate);
		cs.translate(position);
		assert.strictEqual(cs._position.x, position.x);
		assert.strictEqual(cs._position.y, position.y);
		assert.isTrue(cs._translateMatrix.equal(matrix));
		assert.isTrue(cs._isNeedToUpdate);
	});

	function checkMatrix (matrix) {
		assert.strictEqual(matrix.a, 1);
		assert.strictEqual(matrix.b, 0);
		assert.strictEqual(matrix.c, 0);
		assert.strictEqual(matrix.d, 1);
		assert.strictEqual(matrix.e, 0);
		assert.strictEqual(matrix.f, 0);
		assert.strictEqual(matrix._matrix.e(3, 1), 0);
		assert.strictEqual(matrix._matrix.e(3, 2), 0);
		assert.strictEqual(matrix._matrix.e(3, 3), 1);
	}
});
