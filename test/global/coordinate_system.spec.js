import COORDINATE_SYSTEM from "../../src/global/coordinate_system";
import chai from "chai";

let assert = chai.assert;

describe('COORDINATE_SYSTEM', () => {
  it('COORDINATE_SYSTEM', () => {
    assert.property(COORDINATE_SYSTEM, "SCREEN");
    assert.property(COORDINATE_SYSTEM, "CARTESIAN");
  });
});
