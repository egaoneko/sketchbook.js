import {Sketchbook} from "../src/index";
import chai from "chai";

let assert = chai.assert;

describe('Index', () => {
	it('Create Sketchbook', () => {
		let sketchbook = new Sketchbook();
		let canvas = sketchbook.canvas;
		assert.strictEqual(canvas.nodeName, "CANVAS");
	});
});
