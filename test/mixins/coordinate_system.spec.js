import chai from "chai";
import CoordinateSystem from "../../src/mixins/coordinate_system";

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
		cs.scale(2);
		assert.strictEqual(matrix.a, 1);
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
