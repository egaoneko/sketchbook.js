import * as global from "../../src/global/global";
import chai from "chai";

let assert = chai.assert;

describe('Index', () => {
	it('ORIENTATION', () => {
		assert.property(global, "ORIENTATION");
	});
});
