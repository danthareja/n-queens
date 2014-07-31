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
  var newEmptyBoard = new Board({n:n});
  console.log(newEmptyBoard.rows());

  // make board fn to recurse through board
  var makeBoard = function(parentBoard, rowNumber){
    if (rowNumber >= n ){
      console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
      return solutionCount;
    } else {
      for( var i = 0; i < n; i++ ){
        console.log(rowNumber, i);
        console.log(parentBoard.rows());
        parentBoard.togglePiece(rowNumber, i);
        if( !parentBoard.hasColConflictAt(i) ){
          var newChildBoard = new Board(parentBoard.rows());
          // newChildBoard.togglePiece(rowNumber, i);
          console.log(newChildBoard.rows());
          // Count last rows toggles as a proper solution
          if (rowNumber === n - 1) {
            solutionCount++;
          }
          return makeBoard(newChildBoard, rowNumber + 1);
        }
      }
    }
  }
  return makeBoard(newEmptyBoard, 0);
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
