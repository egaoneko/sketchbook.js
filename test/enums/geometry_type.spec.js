import GEOMETRY_TYPE from "../../src/enums/geometry_type";
import chai from "chai";

let assert = chai.assert;

describe('GEOMETRY_TYPE', () => {
  it('POLYLINE', () => {
    assert.strictEqual(GEOMETRY_TYPE.enumValueOf("POLYLINE"), GEOMETRY_TYPE.POLYLINE);
  });

  it('POLYGON', () => {
    assert.strictEqual(GEOMETRY_TYPE.enumValueOf("POLYGON"), GEOMETRY_TYPE.POLYGON);
  });
});
