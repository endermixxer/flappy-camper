//@ts-check
import { CANVAS_WIDTH, STAMINA_VALENCE_BOOST } from "../constants.js";
import { Collidable, collidableType } from "../obstacles/collidable.js";

const VALENCE_SIZE = 32;
let valenceImages;
await fetch("../../images/valence.json")
	.then((response) => response.json())
	.then((json) => {
		valenceImages = json;
	});

console.log(valenceImages);

export class Valence extends Collidable {
	/**
	 * @param {CanvasRenderingContext2D} ctx
	 */
	constructor(ctx) {
		super(
			collidableType.Valence,
			CANVAS_WIDTH + VALENCE_SIZE, // set x to just off the right of the screen
			0, // y will be changed based on where we can place the trash
			VALENCE_SIZE,
			VALENCE_SIZE,
			"lime",
			ctx
		);
		this.isCollectable = true;
		this.staminaImpact = STAMINA_VALENCE_BOOST;

		this.randomImage =
			valenceImages.frames[
				Math.floor(Math.random() * valenceImages.frames.length)
			];

		/** @type {HTMLImageElement} */ //@ts-ignore
		this.image = document.getElementById("valence");

		this.scaledWidth = VALENCE_SIZE;
		this.scaledHeight = VALENCE_SIZE;

		if (this.randomImage.frame.w > this.randomImage.frame.h) {
			this.scaledHeight =
				(this.randomImage.frame.h / this.randomImage.frame.w) *
				VALENCE_SIZE;
		} else {
			this.scaledWidth =
				(this.randomImage.frame.w / this.randomImage.frame.h) *
				VALENCE_SIZE;
		}

		this.h = this.scaledHeight;
		this.w = this.scaledWidth;
	}

	draw() {
		this.ctx.drawImage(
			this.image, // the image we want to draw
			this.randomImage.frame.x, // x coord of where to start our clip
			this.randomImage.frame.y, // y coord of where to start our clip
			this.randomImage.frame.w, // x coord of where to end our clip
			this.randomImage.frame.h, // y coord of where to end our clip
			this.x, // this the x coord of where to place the image
			this.y, // this the y coord of where to place the image
			this.scaledWidth, // the width of the image
			this.scaledHeight // the height of the image
		);
	}
}
