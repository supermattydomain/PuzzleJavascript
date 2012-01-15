/**
 * Auxiliary mathematical functions.
 */

function randomBetween(min, max) {
	return Math.random() * (max - min) + min;
}

function randomIntBetween(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sgn(num) {
	return (num < 0) ? -1 : 1;
}

function distance(x1, y1, x2, y2) {
	return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

function distanceSq(x1, y1, x2, y2) {
	return (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
}
