class Sketchbook {

	constructor () {
		this._canvas = document.createElement('canvas');
	}

	get canvas () {
		return this._canvas;
	}
}

export default Sketchbook;