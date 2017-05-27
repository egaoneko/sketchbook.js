import chai from "chai";
import MouseEventHelper from "../../src/helper/mouse_event_helper";


let assert = chai.assert;

describe('MouseEventHelper', () => {
  let mouseEventHelper;
  let element = document.createElement('div');

  beforeEach(function () {
    mouseEventHelper = new MouseEventHelper(element);
  });

  describe('initialized MouseEventHelper', () => {
  });

  describe('methods', () => {
  });
});
