import { Button, Stack } from "@chakra-ui/react";
import { FC } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { boardState, gameOverState, playerState } from "state";
import SettingsButton from "components/SettingsButton";
import { GrPowerReset } from "react-icons/gr";

const GameControls: FC = () => {
  const board = useRecoilValue(boardState);
  const resetBoard = useResetRecoilState(boardState);
  const resetPlayer = useResetRecoilState(playerState);
  const resetGameOver = useResetRecoilState(gameOverState);

  const handleReset = () => {
    resetBoard();
    resetPlayer();
    resetGameOver();
  };

  return (
    <Stack direction='column' spacing={2}>

      <Button colorScheme='gray' rightIcon={<GrPowerReset/>} onClick={handleReset} isDisabled={!board.some((col) => col.length)}>
        Reset
      </Button>

      <SettingsButton />

    </Stack>
  );
};

export default GameControls;
