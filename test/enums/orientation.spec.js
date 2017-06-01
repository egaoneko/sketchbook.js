import ORIENTATION from "../../src/enums/orientation";
import chai from "chai";

let assert = chai.assert;

describe('orientation', () => {
  it('CW', () => {
    assert.strictEqual(ORIENTATION.enumValueOf("CW"), ORIENTATION.CW);
  });

  it('CCW', () => {
    assert.strictEqual(ORIENTATION.enumValueOf("CCW"), ORIENTATION.CCW);
  });
});
