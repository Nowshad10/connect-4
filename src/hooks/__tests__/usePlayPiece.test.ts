import { act, renderHook } from "@testing-library/react";
import { usePlayPiece } from "hooks";
import { RecoilRoot, useRecoilValue } from "recoil";
import { boardState, gameOverState, playerState } from "state";
import { Board, Player } from "types";

const render = () => {
  const { result } = renderHook(
    () => ({
      play: usePlayPiece(),
      board: useRecoilValue(boardState),
      player: useRecoilValue(playerState),
      gameOver: useRecoilValue(gameOverState),
    }),
    {
      wrapper: RecoilRoot,
    }
  );

  return {
    result,
    play: (col: number) => {
      act(() => {
        result.current.play(col);
      });
    },
    assertGame: (player: Player, gameOver: boolean, board: Board) => {
      expect(result.current.board).toEqual(board);
      expect(result.current.player).toEqual(player);
      expect(result.current.gameOver).toEqual(gameOver);
    },
  };
};

test("should win with 4 in a row vertically", () => {
  const { play, assertGame } = render();

  [0, 1, 0, 1, 0, 1, 0].forEach(play);

  // Player 1 won the game!
  assertGame(1, true, [[1, 1, 1, 1], [2, 2, 2], [], [], [], [], []]);

  play(1);
  // Can't play any more pieces after the game is over
  assertGame(1, true, [[1, 1, 1, 1], [2, 2, 2], [], [], [], [], []]);
});

test("should win with 4 in a row horizontally", () => {
  const { play, assertGame } = render();

  [0, 6, 1, 6, 3, 6, 4, 5, 2].forEach(play);

  // Player 1 won the game!
  assertGame(1, true, [[1], [1], [1], [1], [1], [2], [2, 2, 2]]);
});

test("should win with 4 in a row diagonally upwards starting from first column first row going to fourth column fourth row", () => {
  const { play, assertGame } = render();
  
  [0, 1, 1, 2, 1, 2, 2, 3, 3, 3, 3].forEach(play)
  
  // Player 1 won the game!
  assertGame(1, true, [[1], [2, 1, 1], [2, 2, 1], [2, 1, 2, 1], [], [], []]);
});

test("should win with 4 in a row diagonally upwards starting from third column second row going to sixth column fifth row", () => {
  const { play, assertGame } = render();

  [2, 2, 3, 3, 4, 3, 4, 5, 4, 4, 5, 5, 5, 5].forEach(play)

  // Player 2 won the game!
  assertGame(2, true, [[], [], [1, 2], [1, 2, 2], [1, 1, 1, 2], [2, 1, 2, 1, 2], []]);
});

test("should win with 4 in a row diagonally downwards starting from fourth column fourth row going to seventh column first row", () => {
  const { play, assertGame } = render();

  [6, 5, 5, 4, 4, 5, 4, 3, 3, 3, 3].forEach(play);

  // Player 1 won the game!
  assertGame(1, true, [[], [], [], [2, 1, 2, 1], [2, 1, 1], [2, 1, 2], [1]]);
});

test("should win with 4 in a row diagonally downwards starting from first column sixth row going to fourth column third row", () => {
  const { play, assertGame } = render();

  [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 6, 1, 2, 2, 2, 2, 5, 3, 3, 3].forEach(play);

  // Player 2 won the game!
  assertGame(2, true, [[1, 2, 1, 2, 1, 2], [1, 2, 1, 2, 2], [1, 2, 1, 2], [2, 1, 2], [], [1], [1]]);
});

test("should allow player to play a piece that doesn't win the game into a column that isn't full", () => {
  const { play, assertGame } = render();

  [3, 4, 4, 5, 5, 4, 5, 6, 6].forEach(play);
  assertGame(2, false, [[], [], [], [1], [2, 1, 2], [2, 1, 1], [2, 1]]);

  play(6);
  // Allows Player 2 to place a piece into sixth column which is not yet full but does not win the game, passing the turn onto Player 1
  assertGame(1, false, [[], [], [], [1], [2, 1, 2], [2, 1, 1], [2, 1, 2]]);

  play(6);
  // Allows Player 1 to place a counter into sixth column which is not yet full, causing there to be 4 in a row diagonally and Player 1 winning
  assertGame(1, true, [[], [], [], [1], [2, 1, 2], [2, 1, 1], [2, 1, 2, 1]]);
});

test("should not play a piece when the column is full", () => {
  const { play, assertGame } = render();

  [0, 0, 0, 0, 0, 0].forEach(play);

  assertGame(1, false, [[1, 2, 1, 2, 1, 2], [], [], [], [], [], []]);

  play(0);
  // No change because column is full
  assertGame(1, false, [[1, 2, 1, 2, 1, 2], [], [], [], [], [], []]);
});
