import Sketchbook from "../";
import {strictEqual} from "assert";

describe('Sketchbook', () => {
	it('returns Sketchbook', () => {
		strictEqual(new Sketchbook().toString(), "Sketchbook");
	});
});
