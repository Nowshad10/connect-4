import { boardCols } from "const";
import { atom } from "recoil";
import { Board, Player } from "types";

export const boardState = atom<Board>({
  key: "boardState",
  default: Array(boardCols).fill([]),
});

export const playerState = atom<Player>({
  key: "playerState",
  default: 1,
});

export const gameOverState = atom<boolean>({
  key: "gameOverState",
  default: false,
});

export const playerOneName = atom<String>({
  key: "playerOneName",
  default: 'Player 1'
});

export const playerOneColour = atom<String>({
  key: "playerOneColour",
  default: '#f10000'
});

export const playerTwoName = atom<String>({
  key: "playerTwoName",
  default: 'Player 2'
});

export const playerTwoColour = atom<String>({
  key: "playerTwoColour",
  default: '#ece100'
});
