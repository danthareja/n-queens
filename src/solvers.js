/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var board = new Board({n : n});
  rowIdx = 0;
  colIdx = 0;

  for (var i = 0; i < n; i++) {
    board.togglePiece(i,i);
    rowIdx++;
    colIdx++;
  }

  var solution = board.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var emptyBoard = new Board({n:n});

  // make board fn to recurse through board
  var checkBoard = function(board, rowNumber){
    if (rowNumber === n - 1) {
      solutionCount++;
      console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
      return;
    } else {
      for( var i = 0; i < n; i++ ){
        board.togglePiece(rowNumber, i);
        if( !board.hasColConflictAt(i) ){
          checkBoard(board, rowNumber + 1);
        }
        // untoggle piece
        board.togglePiece(rowNumber, i);
      }
    }
  }
  checkBoard(emptyBoard, 0);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var emptyBoard = new Board({n:n});
  var solution = emptyBoard.rows();

  // mvake boarad fn to rrecurse through board
  var checkBoard = function(board, rowNumber){
    if (rowNumber === n) {
      console.log('Single solution for ' + n + ' queens:', solution);
      return board.rows();
    } else {
      for( var i = 0; i < n; i++ ){
        board.togglePiece(rowNumber, i);
        if( !board.hasAnyQueensConflicts() ){
          var result = checkBoard(board, rowNumber + 1);
          if (result) {return result};
        }
        // untoggle piece
        board.togglePiece(rowNumber, i);
      }
    }
  }
  checkBoard(emptyBoard, 0);
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var emptyBoard = new Board({n:n});

  // make board fn to recurse through board
  var checkBoard = function(board, rowNumber){
    if (rowNumber === n) {
      solutionCount++;
      console.log('Number of solutions for ' + n + ' queens:', solutionCount);
      return;
    } else {
      for( var i = 0; i < n; i++ ){
        board.togglePiece(rowNumber, i);
        if( !board.hasAnyQueensConflicts() ){
          checkBoard(board, rowNumber + 1);
        }
        // untoggle piece
        board.togglePiece(rowNumber, i);
      }
    }
  }
  checkBoard(emptyBoard, 0);
  return solutionCount;
};
