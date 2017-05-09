import chai from "chai";
import Sketchbook from "../src/sketchbook";
import Point from "../src/objects/point";
import {ORIGIN, COORDINATE_SYSTEM} from "../src/global/global";

let assert = chai.assert;

describe('Sketchbook', () => {
  let sketchbook;

  beforeEach(function () {
    sketchbook = new Sketchbook();
  });

  describe('initialized Sketchbook', () => {
    it('construct Sketchbook without parameter', () => {
      let canvas = sketchbook.canvas;
      assert.strictEqual(canvas.nodeName, "CANVAS");
    });

    it('construct Sketchbook with canvas element', () => {
      let canvasElement = document.createElement('canvas');
      sketchbook = new Sketchbook(canvasElement);
      let canvas = sketchbook.canvas;
      assert.strictEqual(canvas, canvasElement);
    });

    it('construct Sketchbook with wrong canvas element', () => {
      let wrongCanvasElement = document.createElement('a');
      assert.throws(()=>new Sketchbook(wrongCanvasElement), TypeError, "Input element is not canvas.");
    });

    it('construct Sketchbook with id', () => {
      let id = "canvas";
      let canvasElement = document.createElement('canvas');
      canvasElement.id = id;
      document.body.appendChild(canvasElement);
      sketchbook = new Sketchbook(id);
      let canvas = sketchbook.canvas;
      assert.strictEqual(canvas, canvasElement);
      assert.strictEqual(canvas.id, canvasElement.id);
    });

    it('construct Sketchbook with wrong id', () => {
      let wrongId = "wrong-canvas";
      assert.throws(()=>new Sketchbook(wrongId), Error, "Cannot found element by id.");
    });

    it('initialized position', () => {
      let position = sketchbook._position;
      assert.strictEqual(position.x, 0);
      assert.strictEqual(position.y, 0);
    });
  });

  describe('options', () => {
    describe('origin', () => {
      it('initialized default origin', () => {
        assert.strictEqual(sketchbook._opt.origin, ORIGIN.LEFT_TOP);
      });

      it('get option origin', () => {
        assert.strictEqual(sketchbook.getOption("origin"), ORIGIN.LEFT_TOP);
      });

      it('set option origin', () => {
        sketchbook.setOption("origin", ORIGIN.CENTER);
        assert.strictEqual(sketchbook._opt.origin, ORIGIN.CENTER);
      });
    });

    describe('coordinateSystem', () => {
      it('initialized default coordinateSystem', () => {
        assert.strictEqual(sketchbook._opt.coordinateSystem, COORDINATE_SYSTEM.SCREEN);
      });

      it('get option coordinateSystem', () => {
        assert.strictEqual(sketchbook.getOption("coordinateSystem"), COORDINATE_SYSTEM.SCREEN);
      });

      it('set option coordinateSystem', () => {
        sketchbook.setOption("coordinateSystem", COORDINATE_SYSTEM.CARTESIAN);
        assert.strictEqual(sketchbook._opt.coordinateSystem, COORDINATE_SYSTEM.CARTESIAN);
      });
    });
  });

  describe('methods', () => {
    it('get canvas', () => {
      let canvas = document.createElement('canvas');
      sketchbook = new Sketchbook(canvas);
      assert.strictEqual(sketchbook.canvas, canvas);
    });

    it('get context', () => {
      let canvas = document.createElement('canvas');
      sketchbook = new Sketchbook(canvas);
      assert.strictEqual(sketchbook.context, canvas.getContext('2d'));
    });

    it('get width', () => {
      let width = 500;
      let canvasElement = document.createElement('canvas');
      canvasElement.width = width;
      sketchbook = new Sketchbook(canvasElement);
      assert.strictEqual(sketchbook.width, width);
    });

    it('get height', () => {
      let height = 500;
      let canvasElement = document.createElement('canvas');
      canvasElement.height = height;
      sketchbook = new Sketchbook(canvasElement);
      assert.strictEqual(sketchbook.height, height);
    });

    it('set width', () => {
      let width = 500;
      let canvasElement = document.createElement('canvas');
      sketchbook = new Sketchbook(canvasElement);
      sketchbook.width = width;
      assert.strictEqual(sketchbook._canvas.width, width);
    });

    it('set height', () => {
      let height = 500;
      let canvasElement = document.createElement('canvas');
      sketchbook = new Sketchbook(canvasElement);
      sketchbook.height = height;
      assert.strictEqual(sketchbook._canvas.height, height);
    });

    it('add', () => {
      let object = {
        render: ()=> {
        }
      };
      let lenderList = sketchbook._renderList;

      sketchbook.add(object);
      assert.strictEqual(lenderList[lenderList.length - 1], object);
    });

    it('add without object', () => {
      assert.throws(()=>sketchbook.add(), Error, "Cannot found object.");
    });

    it('add with empty object', () => {
      let object = {};
      assert.throws(()=>sketchbook.add(object), Error, "This object doesn't have render method.");
    });

    it('add with render is not function', () => {
      let object = {
        render: 1
      };
      assert.throws(()=>sketchbook.add(object), Error, "The render method isn't a function.");
    });

    it('get origin with ORIGIN.LEFT_TOP option', () => {
      sketchbook.position = new Point([100, 50]);
      let position = sketchbook._getOrigin();

      assert.strictEqual(position.x, 100);
      assert.strictEqual(position.y, 50);
    });

    it('get origin with ORIGIN.CENTER option', () => {
      sketchbook.position = new Point([100, 50]);
      sketchbook.setOption("origin", ORIGIN.CENTER);

      sketchbook.width = 50;
      sketchbook.height = 50;
      let position = sketchbook._getOrigin();

      assert.strictEqual(position.x, 75);
      assert.strictEqual(position.y, 25);
    });

    it('convert position from Local CS to Screen with Point', () => {
      let position = new Point([0, 0]);
      assert.doesNotThrow(()=>sketchbook.convertPositionFromLocalCSToScreen(position));
    });

    it('convert position from Local CS to Screen with empty', () => {
      assert.throws(()=>sketchbook.convertPositionFromLocalCSToScreen(), TypeError, "Input position is not Point.");
    });

    it('convert position from Local CS to Screen with not Point', () => {
      let position = {};
      assert.throws(()=>sketchbook.convertPositionFromLocalCSToScreen(position), TypeError, "Input position is not Point.");
    });

    it('convert position from Screen to Screen', () => {
      sketchbook.width = 300;
      sketchbook.height = 300;
      sketchbook.setOption("coordinateSystem", COORDINATE_SYSTEM.SCREEN);
      let position = new Point([100, 100]);
      let actualPosition = sketchbook.convertPositionFromLocalCSToScreen(position);
      let expectedPosition = new Point([100, 100]);

      assert.strictEqual(actualPosition.x, expectedPosition.x);
      assert.strictEqual(actualPosition.y, expectedPosition.y);
    });

    it('convert position from Cartesian to Screen', () => {
      sketchbook.width = 300;
      sketchbook.height = 300;
      sketchbook.setOption("coordinateSystem", COORDINATE_SYSTEM.CARTESIAN);
      let position = new Point([100, 100]);
      let actualPosition = sketchbook.convertPositionFromLocalCSToScreen(position);
      let expectedPosition = new Point([100, 300 - 100]);

      assert.strictEqual(actualPosition.x, expectedPosition.x);
      assert.strictEqual(actualPosition.y, expectedPosition.y);
    });
  });
});
