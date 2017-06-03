import MOUSE_EVENT from "../../../src/enums/events/mouse_event";
import chai from "chai";

let assert = chai.assert;

describe('MOUSE_EVENT', () => {
  it('click', () => {
    assert.strictEqual(MOUSE_EVENT.enumValueOf("click"), MOUSE_EVENT.click);
  });

  it('contextmenu', () => {
    assert.strictEqual(MOUSE_EVENT.enumValueOf("contextmenu"), MOUSE_EVENT.contextmenu);
  });

  it('dblclick', () => {
    assert.strictEqual(MOUSE_EVENT.enumValueOf("dblclick"), MOUSE_EVENT.dblclick);
  });

  it('mousedown', () => {
    assert.strictEqual(MOUSE_EVENT.enumValueOf("mousedown"), MOUSE_EVENT.mousedown);
  });

  it('mouseenter', () => {
    assert.strictEqual(MOUSE_EVENT.enumValueOf("mouseenter"), MOUSE_EVENT.mouseenter);
  });

  it('mouseleave', () => {
    assert.strictEqual(MOUSE_EVENT.enumValueOf("mouseleave"), MOUSE_EVENT.mouseleave);
  });

  it('mousemove', () => {
    assert.strictEqual(MOUSE_EVENT.enumValueOf("mousemove"), MOUSE_EVENT.mousemove);
  });

  it('mouseover', () => {
    assert.strictEqual(MOUSE_EVENT.enumValueOf("mouseover"), MOUSE_EVENT.mouseover);
  });

  it('mouseout', () => {
    assert.strictEqual(MOUSE_EVENT.enumValueOf("mouseout"), MOUSE_EVENT.mouseout);
  });

  it('mouseup', () => {
    assert.strictEqual(MOUSE_EVENT.enumValueOf("mouseup"), MOUSE_EVENT.mouseup);
  });

  it('mousewheel', () => {
    assert.strictEqual(MOUSE_EVENT.enumValueOf("mousewheel"), MOUSE_EVENT.mousewheel);
  });

  it('DOMMouseScroll', () => {
    assert.strictEqual(MOUSE_EVENT.enumValueOf("DOMMouseScroll"), MOUSE_EVENT.DOMMouseScroll);
  });
});
