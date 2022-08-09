import { Heading } from "@chakra-ui/react";
import { playerColor, playerName } from "const";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { gameOverState, playerOneColour, playerOneName, playerState, playerTwoColour, playerTwoName } from "state";

const GameProgress: FC = () => {
  const player = useRecoilValue(playerState);
  const gameOver = useRecoilValue(gameOverState);
  const p1name = useRecoilValue(playerOneName);
  const p1colour = useRecoilValue(playerOneColour);
  const p2name = useRecoilValue(playerTwoName);
  const p2colour = useRecoilValue(playerTwoColour);
  const name = player === 1 ? p1name || playerName[player] : p2name || playerName[player];
  const colour = player === 1 ? p1colour || playerColor[player] : p2colour || playerColor[player];

  return (
    <Heading as="h3" size="lg" color={colour.toLowerCase()}>
      {gameOver ? `${name} wins!` : `${name}'s turn`}
    </Heading>
  );
};

export default GameProgress;
