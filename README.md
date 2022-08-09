## The Challenge

We have created a very simple Connect 4 game using some of our favorite [front-end technologies](#technology-choices). The rules of the game are simple: the first player to connect 4 of the same colored discs in a row (either vertically, horizontally, or diagonally) wins. There is one issue that we'd like you to solve: the logic to determine a winner does not check for 4 in a row diagonally, you should implement this logic with tests. We've also come up with a list of [possible improvements](#possible-improvements). Feel free to implement as many or as few of these as you like or try something not on this list (you have complete creative freedom). We understand that your time is precious so try not to spend more than a couple of hours on this.

## Getting Started

`npm i` - install dependences

`npm start` - run the application

`npm t` - run the tests

## Possible Improvements

- Persist game state between sessions (hint - https://recoiljs.org/docs/guides/atom-effects#local-storage-persistence)
- Record and present game stats
- Allow players to select their name and color
- Play againt a bot
- Increase unit test coverage
- Add end-to-end tests
- UX improvements
- Responsive styles
- Performance optimization

## Technology Choices

- React
- Typescript
- Create React App
- React Testing Library
- [Chakra UI](https://chakra-ui.com/docs/components)
- [RecoilJS](https://recoiljs.org/)

## Changelog

- [x] Added some unit tests to check diagonal win logic.
- [x] Created function `diagonalWinCheck` in the file `src/hooks/usePlayPiece.ts` that handles the logic for players being able to win with 4 in a row diagonally in any direction.
- [x] Implemented functionality for players to be able to choose their name and colour.
    - [x] Created component called `SettingsButton` that opens up a modal with a controlled form that takes in user inputs for name/colour.
    - [x] Added states for each players name and colour using Recoil atoms.These states are then changed when a player inputs something in the form for the name and colour.
    - [x] Added a 'End Session' button that reverts the state of the players' names and colours back to the default values.
