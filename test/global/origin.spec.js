import ORIGIN from "../../src/global/origin";
import chai from "chai";

let assert = chai.assert;

describe('ORIGIN', () => {
  it('ORIGIN', () => {
    assert.property(ORIGIN, "LEFT_TOP");
    assert.property(ORIGIN, "CENTER");
  });
});
