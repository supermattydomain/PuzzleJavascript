/**
 * Swap the positions in the DOM of two jQuery sets of elements.
 */

(function($) {
	$.fn.swapWith = function(b) {
		var next = this.next();
		if (next[0] === b[0]) {
			next = this;
		}
		// Move this to before b
		this.insertBefore(b);
		// Now move b to where this used to be
		if (next.length) {
			// b goes before what was previously this' next sibling
			b.insertBefore(next);
		} else {
			// this didn't have a next sibling; b goes at the end
			this.parent().append(b);
		}
		return this;
	};
})(jQuery);
