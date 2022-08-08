import { boardCols, boardRows } from "const";
import { useRecoilState } from "recoil";
import { boardState, gameOverState, playerState } from "state";

const testWin = (arr: number[]): boolean => /1{4}|2{4}/.test(arr.join(""));

const diagonalWinCheck = (pieceCol: number, pieceRow: number, lastPlayed: number[][]) => {

  const arr: number[] = [];

  // Loop through spaces starting 3 behind and 3 below the current piece up to space 3 ahead and 3 above, in diagonal left-to-right upward direction. If space is on the board, add which player's piece occupies that space into the array, otherwise add 0.
  for (let i: number = pieceCol - 3, j: number = pieceRow - 3; i <= pieceCol + 3 && j <= pieceRow + 3; i++, j++) {
    if (i >= 0 && i < boardCols && j >= 0 && j < boardRows) {
      arr.push(lastPlayed[i][j] || 0)
    };
  };

  // Check if array contains 4 1's or 4 2's in a row, if so return true - no need to carry out other for loop. Else it will carry on.
  if (testWin(arr)) {
    return true
  };

  // Similar logic as above, direction is different (left-to-right diagonally downwards)
  for (let i: number = pieceCol - 3, j: number = pieceRow + 3; i <= pieceCol + 3 && j >= pieceRow - 3; i++, j--) {
    if (i >= 0 && i < boardCols && j >= 0 && j < boardRows) {
      arr.push(lastPlayed[i][j] || 0)
    };
  };

  return testWin(arr);
}

const usePlayPiece = () => {
  const [board, setBoard] = useRecoilState(boardState);
  const [player, setPlayerTurn] = useRecoilState(playerState);
  const [gameOver, setGameOver] = useRecoilState(gameOverState);

  return (col: number) => {
    // Prevent adding a piece when the game is over
    if (gameOver) {
      return;
    }

    // Prevent adding a piece when the column is full
    if (board[col].length === boardRows) {
      return;
    }

    // Play piece (non mutating)
    const newBoard = board.map((column, i) =>
      i === col ? [...column, player] : column
    );
    
    const row = newBoard[col].length - 1;

    // console.log(newBoard) // returns current state of board

    // console.log(newBoard[col]) // returns array of pieces in current column

    // console.log(newBoard.map((col) => col[row] || 0)) // returns array of pieces in each row

    if (
      testWin(newBoard[col]) || // Did win vertically
      testWin(newBoard.map((col) => col[row] || 0)) // Did win horizontally
      // TODO: Did win diagonally
      // || testWin(diagonalCheck(col, row, newBoard))
      || diagonalWinCheck(col, row, newBoard)
    ) {
      setGameOver(true);
    } else {
      setPlayerTurn(player === 1 ? 2 : 1);
    }

    setBoard(newBoard);
  };
};

export default usePlayPiece;
