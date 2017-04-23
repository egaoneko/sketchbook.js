import chai from "chai";
import Point from "../../src/objects/point";

let assert = chai.assert;

describe('Point', () => {
	let point = null;

	beforeEach(function () {
		point = new Point([0, 0]);
	});

	describe('initialized Point', () => {
		it('initialized point', () => {
			assert.strictEqual(point.x, 0);
			assert.strictEqual(point.y, 0);
		});
	});
});
