import COORDINATE_SYSTEM from "../../src/enums/coordinate_system";
import chai from "chai";

let assert = chai.assert;

describe('COORDINATE_SYSTEM', () => {
  it('SCREEN', () => {
    assert.strictEqual(COORDINATE_SYSTEM.enumValueOf("SCREEN"), COORDINATE_SYSTEM.SCREEN);
  });

  it('CARTESIAN', () => {
    assert.strictEqual(COORDINATE_SYSTEM.enumValueOf("CARTESIAN"), COORDINATE_SYSTEM.CARTESIAN);
  });
});
