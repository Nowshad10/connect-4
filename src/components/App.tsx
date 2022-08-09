import { ChakraProvider, Container, VStack } from "@chakra-ui/react";
import Board from "components/Board";
import GameControls from "components/GameControls";
import GameProgress from "components/GameProgress";
import { FC } from "react";
import { RecoilRoot } from "recoil";
import '../style.css';

const App: FC = () => (
  <ChakraProvider>
    <RecoilRoot>
      <Container py={4} as={VStack}>
        <h2 id="main-heading"><span id="connect">Connect </span><span id='four'>4</span></h2>
        <Board />
        <GameProgress />
        <GameControls />
      </Container>
    </RecoilRoot>
  </ChakraProvider>
);

export default App;
