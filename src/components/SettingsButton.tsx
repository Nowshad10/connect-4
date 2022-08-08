import React, { FC } from 'react';
import { MdBuild } from "react-icons/md";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    FormHelperText,
    Input
  } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { playerOneColour, playerOneName, playerTwoColour, playerTwoName } from 'state';

const SettingsButton: FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [playerOneNameRecoil, setPlayerOneNameRecoil] = useRecoilState(playerOneName);
    const [playerOneColourRecoil, setPlayerOneColourRecoil] = useRecoilState(playerOneColour);
    const [playerTwoNameRecoil, setPlayerTwoNameRecoil] = useRecoilState(playerTwoName);
    const [playerTwoColourRecoil, setPlayerTwoColourRecoil] = useRecoilState(playerTwoColour);

    const playerOneNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerOneNameRecoil(e.target.value);
    };

    const playerOneColourHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerOneColourRecoil(e.target.value);
    };

    const playerTwoNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerTwoNameRecoil(e.target.value);
    };

    const playerTwoColourHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerTwoColourRecoil(e.target.value);
    };

    return (
        <>
            <Button onClick={onOpen} rightIcon={<MdBuild/>} colorScheme='cyan' variant='solid'>
                Settings
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInRight' scrollBehavior='inside' size='md' closeOnOverlayClick={false}>
                <ModalOverlay bg='none'
                    backdropFilter='auto'
                    backdropInvert='80%'
                    backdropBlur='2px'/>
                <ModalContent>
                    <ModalHeader>Player Settings</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Player 1 name</FormLabel>
                            <Input onChange={playerOneNameHandler} type='text' />
                            <FormLabel>Player 1 Colour:</FormLabel>
                            <Input onChange={playerOneColourHandler} type='text' />
                            <FormHelperText>You can type any colour, or enter its hex/rgb value.</FormHelperText>
                            <br/>
                            <FormLabel>Player 2 name</FormLabel>
                            <Input onChange={playerTwoNameHandler} type='text' />
                            <FormLabel>Player 2 Colour</FormLabel>
                            <Input onChange={playerTwoColourHandler} type='text' />
                            <FormHelperText>You can type any colour, or enter its hex/rgb value.</FormHelperText>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' variant='outline' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button onClick={onClose} colorScheme='green' variant='solid'>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>


    )
}

export default SettingsButton
