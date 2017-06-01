import ORIGIN from "../../src/enums/origin";
import chai from "chai";

let assert = chai.assert;

describe('ORIGIN', () => {
  it('LEFT_TOP', () => {
    assert.strictEqual(ORIGIN.enumValueOf("LEFT_TOP"), ORIGIN.LEFT_TOP);
  });

  it('CENTER', () => {
    assert.strictEqual(ORIGIN.enumValueOf("CENTER"), ORIGIN.CENTER);
  });
});
