import * as global from "../../src/enums/global";
import chai from "chai";

let assert = chai.assert;

describe('Global', () => {
  it('ORIENTATION', () => {
    assert.property(global, "ORIENTATION");
  });

  it('ORIGIN', () => {
    assert.property(global, "ORIGIN");
  });

  it('COORDINATE_SYSTEM', () => {
    assert.property(global, "COORDINATE_SYSTEM");
  });

  it('GEOMETRY_TYPE', () => {
    assert.property(global, "GEOMETRY_TYPE");
  });
});
