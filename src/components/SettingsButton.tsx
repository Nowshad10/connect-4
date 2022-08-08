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

const SettingsButton: FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    
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
                            <Input type='text' />
                            <FormLabel>Player 1 Colour:</FormLabel>
                            <Input type='text' />
                            <FormHelperText>You can type any colour, or enter its hex/rgb value.</FormHelperText>
                            <br/>
                            <FormLabel>Player 2 name</FormLabel>
                            <Input type='text' />
                            <FormLabel>Player 2 Colour</FormLabel>
                            <Input type='text' />
                            <FormHelperText>You can type any colour, or enter its hex/rgb value.</FormHelperText>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' variant='outline' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme='green' variant='solid'>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>


    )
}

export default SettingsButton
