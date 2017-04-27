import ORIENTATION from "../../src/global/orientation";
import chai from "chai";

let assert = chai.assert;

describe('orientation', () => {
	it('ORIENTATION', () => {
		assert.property(ORIENTATION, "CW");
		assert.property(ORIENTATION, "CCW");
	});
});
