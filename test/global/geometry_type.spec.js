import GEOMETRY_TYPE from "../../src/global/geometry_type";
import chai from "chai";

let assert = chai.assert;

describe('GEOMETRY_TYPE', () => {
  it('GEOMETRY_TYPE', () => {
    assert.property(GEOMETRY_TYPE, "POLYLINE");
    assert.property(GEOMETRY_TYPE, "POLYGON");
  });
});
