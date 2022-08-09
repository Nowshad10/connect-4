import { Button, Stack } from "@chakra-ui/react";
import { FC } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { boardState, gameOverState, playerOneColour, playerOneName, playerState, playerTwoColour, playerTwoName } from "state";
import SettingsButton from "components/SettingsButton";
import { GrPowerReset } from "react-icons/gr";
import { TiDelete } from "react-icons/ti";

const GameControls: FC = () => {
  const board = useRecoilValue(boardState);
  const resetBoard = useResetRecoilState(boardState);
  const resetPlayer = useResetRecoilState(playerState);
  const resetGameOver = useResetRecoilState(gameOverState);
  const resetPlayerOneName = useResetRecoilState(playerOneName);
  const resetPlayerOneColour = useResetRecoilState(playerOneColour);
  const resetPlayerTwoName = useResetRecoilState(playerTwoName);
  const resetPlayerTwoColour = useResetRecoilState(playerTwoColour);

  const handleReset = () => {
    resetBoard();
    resetPlayer();
    resetGameOver();
  };

  const handleEndSession = () => {
    resetBoard();
    resetPlayer();
    resetGameOver();
    resetPlayerOneName();
    resetPlayerOneColour();
    resetPlayerTwoName();
    resetPlayerTwoColour();
  };

  return (
    <Stack direction='column' spacing={2}>

      <Button colorScheme='gray' rightIcon={<GrPowerReset/>} onClick={handleReset} isDisabled={!board.some((col) => col.length)}>
        Reset Game
      </Button>

      <SettingsButton />

      <Button onClick={handleEndSession} colorScheme='red' rightIcon={<TiDelete/>}>
        End Session
      </Button>

    </Stack>
  );
};

export default GameControls;
