import chai from "chai";
import Sketchbook from "../src/sketchbook";

let assert = chai.assert;

describe('Sketchbook', () => {
	it('construct Sketchbook without parameter', () => {
		let sketchbook = new Sketchbook();
		let canvas = sketchbook.canvas;
		assert.strictEqual(canvas.nodeName, "CANVAS");
	});

	it('construct Sketchbook with canvas element', () => {
		let canvasElement = document.createElement('canvas');
		let sketchbook = new Sketchbook(canvasElement);
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
		let sketchbook = new Sketchbook(id);
		let canvas = sketchbook.canvas;
		assert.strictEqual(canvas, canvasElement);
		assert.strictEqual(canvas.id, canvasElement.id);
	});

	it('construct Sketchbook with wrong id', () => {
		let wrongId = "wrong-canvas";
		assert.throws(()=>new Sketchbook(wrongId), Error, "Cannot found element by id.");
	});
});
