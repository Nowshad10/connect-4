import { Circle, Flex } from "@chakra-ui/react";
import { boardRows } from "const";
import { usePlayPiece } from "hooks";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { boardState, gameOverState, playerOneColour, playerState, playerTwoColour } from "state";
import { Player } from "types";

const padCol = (col: number[]): number[] =>
  col.join("").padEnd(boardRows, "0").split("").map(Number);

const Board: FC = () => {
  const play = usePlayPiece();
  const board = useRecoilValue(boardState);
  const player = useRecoilValue(playerState);
  const gameOver = useRecoilValue(gameOverState);

  const playersColours = {
    1: useRecoilValue(playerOneColour).toLowerCase(),
    2: useRecoilValue(playerTwoColour).toLowerCase()
  };

  return (
    <Flex justify="center">
      {board.map((col, i) => (
        <Flex
          key={i}
          role="group"
          onClick={() => play(i)}
          flexDirection="column-reverse"
          cursor={gameOver ? "auto" : "pointer"}
        >
          {padCol(col).map((p, j) => (
            <Circle
              m={1}
              size="40px"
              key={`${i}-${j}`}
              boxShadow="inner"
              bg={playersColours[p as Player] || "gray.300"}
            />
          ))}
          <Circle
            m={1}
            size="40px"
            boxShadow="base"
            visibility="hidden"
            bg={playersColours[player]}
            _groupHover={{
              visibility: gameOver ? "hidden" : "visible",
            }}
          />
        </Flex>
      ))}
    </Flex>
  );
};

export default Board;
