import * as sketchbook from "../src/index";
import chai from "chai";

let assert = chai.assert;

describe('Index', () => {
  it('Create Sketchbook', () => {
    let sb = new sketchbook.Sketchbook();
    let canvas = sb.canvas;
    assert.strictEqual(canvas.nodeName, "CANVAS");
  });

  it('Sketchbook', () => {
    assert.property(sketchbook, "Sketchbook");
  });

  it('Point', () => {
    assert.property(sketchbook, "Point");
  });

  it('Shape', () => {
    assert.property(sketchbook, "Shape");
  });

  it('Rect', () => {
    assert.property(sketchbook, "Rect");
  });

  it('Circle', () => {
    assert.property(sketchbook, "Circle");
  });

  it('Line', () => {
    assert.property(sketchbook, "Line");
  });

  it('Group', () => {
    assert.property(sketchbook, "Group");
  });

  it('Geometry', () => {
    assert.property(sketchbook, "Geometry");
  });

  it('global', () => {
    assert.property(sketchbook, "global");
  });
});
