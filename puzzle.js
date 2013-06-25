/**
 * Fifteen Puzzle.
 * Matthew 2012-01-15
 */

function Puzzle(elt, img, rows, cols) {
	this.img = img;
	this.rows = rows;
	this.cols = cols;
	this.holeRow = this.rows - 1;
	this.holeCol = this.cols - 1;
	this.elt = elt;
	var that = this;
	$.imJQMosaic({
		image : this.img.attr('src'),
		target : this.elt,
		frameWidth : this.img.width(),
		frameHeight : this.img.height(),
		numberOfTilesX : this.cols,
		numberOfTilesY : this.rows,
		// FIXME: Setting the margin to 0 here causes incorrect floating of tile divs
		tileMargin : '1',
		tileBorderRadius : '0',
	});
	this.getTile = function(row, col) {
		return $($('#' + this.elt + ' .imjqmosaic_tile')[row * this.cols + col]);
	};
	this.getTileIndex = function(tile) {
		return $('#' + this.elt + ' .imjqmosaic_tile').index(tile);
	};
	this.swapTiles = function(row, col) {
		var tile1 = this.getTile(row, col), tile2 = this.getTile(this.holeRow, this.holeCol);
		tile1.swapWith(tile2);
		this.holeRow = row;
		this.holeCol = col;
	};
	this.moveTiles = function(row, col) {
		if ((row == this.holeRow) == (col == this.holeCol)) { // not xor
			/*
			 * Can't move tiles diagonally, and can't move the empty hole. So
			 * precisely one of (clickRow != holeRow) and (clickCol != holeCol)
			 * must obtain to move.
			 */
			return false;
		} else if (1 == Math.abs(this.holeCol - col) || 1 == Math.abs(this.holeRow - row)) {
			// this tile & hole are already neighbours
		} else if (this.holeCol == col) {
			// row diff > 1 && no col diff - recurse rows
			this.moveTiles(row + sign(this.holeRow - row), col);
		} else {
			// col diff > 1 && no row diff - recurse cols
			this.moveTiles(row, col + sign(this.holeCol - col));
		}
		// Hole is now next to clicked tile.
		// Swap tile and hole and report success.
		this.swapTiles(row, col);
		return true;
	};
	// All tiles except the empty square attempt to slide toward the empty square when clicked
	$('.imjqmosaic_tile').css({cursor: 'pointer', margin: '0px'}).on('click', function() {
		var index = that.getTileIndex(this);
		var row = Math.floor(index / that.cols), col = index % that.cols;
		that.moveTiles(row, col);
	});
	// The empty square has no background and does nothing if clicked
	this.getTile(this.holeRow, this.holeCol).css({'background-image': 'none', 'background-color': '#999999', cursor: 'default'}).off('click');
	/**
	 * Shuffle the empty row, beginning at some random non-empty column within it.
	 */
	this.shuffleRow = function() {
		// Starting column
		var col = this.holeCol;
		col += randomIntBetween(1, this.cols - 1);
		col %= this.cols;
		this.moveTiles(this.holeRow, col);
	},
	/**
	 * Shuffle the empty column, beginning at some random non-empty row within it.
	 */
	this.shuffleCol = function() {
		// Starting row
		var row = this.holeRow;
		row += randomIntBetween(1, this.rows - 1);
		row %= this.rows;
		this.moveTiles(row, this.holeCol);
	},
	this.scramble = function() {
		var i;
		for (i = 0; i < this.rows * this.cols; i++) {
			this.shuffleRow();
			this.shuffleCol();
		}
	};
}

$(function() {
	$('button, input[type="button"], input[type="checkbox"]').button();
});

$(window).on('load', function() {
	var originalImage = $('#puzzleImage');
	var puzzle = new Puzzle('puzzle', originalImage, 4, 4);
	$('#buttonScramble').on('click', function() {
		puzzle.scramble();
	});
});
