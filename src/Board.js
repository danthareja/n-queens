// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var checkRow = this.rows()[rowIndex];
      var pieceCount = 0;
      for( var i = 0; i < checkRow.length; i++ ){
        if( checkRow[i] ){
          pieceCount++;
        }
      }
      return pieceCount > 1 ? true : false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var boardMatrix = this.rows();
      var hasConflict = false;
      for( var i = 0; i < boardMatrix.length; i++ ){
        hasConflict = hasConflict || this.hasRowConflictAt(i);
      }
      return hasConflict;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var boardMatrix = this.rows();
      var pieceCount = 0;
      for ( var i = 0; i < boardMatrix.length; i++ ){
        if ( boardMatrix[i][colIndex] ) {
          pieceCount++;
        }
      }
      return pieceCount > 1 ? true : false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var boardMatrix = this.rows();
      var hasConflict = false;
      for( var i = 0; i < boardMatrix.length; i++ ){
        hasConflict = hasConflict || this.hasColConflictAt(i);
      }
      return hasConflict;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // Start at [0][input]
      var boardMatrix = this.rows();
      var rowIndex = 0;
      var colIndex = majorDiagonalColumnIndexAtFirstRow;
      var pieceCount = 0;
      // Check to see if position is in bounds or out of bounds with negative col index
      while ( this._isInBounds(rowIndex, colIndex) || colIndex < 0 ){
        // Check to see if in bounds
        if ( this._isInBounds(rowIndex, colIndex) ){
          // Check to see if there is a piece
          if ( boardMatrix[rowIndex][colIndex] ){
            // Add to piece count
            pieceCount++;
          }
        }
        rowIndex++;
        colIndex++;
      }
      // return piece count
      return pieceCount > 1 ? true : false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var boardMatrix = this.rows();
      var hasConflict = false;
      var startLoopIndex = -this.attributes.n - 2;
      var endLoopIndex = this.attributes.n - 2;

      for( var i = startLoopIndex; i <= endLoopIndex; i++ ){
        hasConflict = hasConflict || this.hasMajorDiagonalConflictAt(i);
      }
      return hasConflict;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // Start at [0][input]
      var boardMatrix = this.rows();
      var rowIndex = 0;
      var colIndex = minorDiagonalColumnIndexAtFirstRow;
      var pieceCount = 0;
      // Check to see if position is in bounds or out of bounds with col index > n
      while ( this._isInBounds(rowIndex, colIndex) || colIndex > this.attributes.n ){
        // Check to see if in bounds
        if ( this._isInBounds(rowIndex, colIndex) ){
          // Check to see if there is a piece
          if ( boardMatrix[rowIndex][colIndex] ){
            // Add to piece count
            pieceCount++;
          }
        }
        rowIndex++;
        colIndex--;
      }
      // return piece count
      return pieceCount > 1 ? true : false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var boardMatrix = this.rows();
      var hasConflict = false;
      var n = this.attributes.n * 2

      for( var i = 1; i <= n; i++ ){
        hasConflict = hasConflict || this.hasMinorDiagonalConflictAt(i);
      }
      return hasConflict;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
