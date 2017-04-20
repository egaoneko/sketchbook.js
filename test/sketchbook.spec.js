import Sketchbook from "../src/sketchbook";
import chai from "chai";

let assert = chai.assert;

describe('Sketchbook', () => {
	it('construct Sketchbook without parameter', () => {
		let sketchbook = new Sketchbook();
		let canvas = sketchbook.canvas;
		assert.strictEqual(canvas.nodeName, "CANVAS");
	});
});
