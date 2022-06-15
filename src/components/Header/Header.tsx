import React from "react";

import {
    Heading,
    Flex,
    Button,
    HStack,
} from "@chakra-ui/react";

import { FaPlay, FaRandom, FaFileUpload, FaPause, FaUndo } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/Store/Store";

import { play, pause, increment, setTimerId, setStep } from "../../Redux/Features/Step";
import { initializeGrid, nextGrid } from "../../Redux/Features/Game";

interface HeaderProps {
    handleOpen?: () => void,
}

export const Header: React.FC<HeaderProps> = ({ handleOpen }) => {

    const dispatch = useDispatch()

    const step = useSelector((state: RootState) => state.step.step);
    const isRunning = useSelector((state: RootState) => state.step.isRunning);
    const timerId = useSelector((state: RootState) => state.step.timerId);


    const handlePlayButton = () => {

        if (isRunning) {
            dispatch(pause());
            //we stop the timer and we set it to zero
            clearInterval(timerId);
            dispatch(setTimerId(0));
            return;
        }
        dispatch(play());
        //we create a new timer when every 500ms we execute the game
        const newTimerId = setInterval(() => {
            dispatch(increment());
            dispatch(nextGrid());
        }, 500);
        dispatch(setTimerId(newTimerId));

    }


    const handleClearButton = (rand: boolean) => {
        if (isRunning) {
            handlePlayButton();
        }
        dispatch(setStep(0));
        dispatch(initializeGrid({ rand: rand }));
    }


    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            padding={["1rem", "0.5rem 3rem"]}
            bg="teal.500"
            color="white"
            position="sticky"
            top={0}
            zIndex={2}
        >
            <Flex align="center" mr={5}>
                <Heading size="lg" ml="10px" mr="60px">
                    Game of Life
                </Heading>
                <HStack spacing='24px'>
                    <Button leftIcon={<FaFileUpload />} colorScheme='yellow' onClick={() => handleOpen!()} >
                        Import
                    </Button>
                    {
                        !isRunning ?
                            <Button colorScheme='white' variant={"outline"} onClick={() => handlePlayButton()} >
                                < FaPlay size={"24px"} />
                            </Button> :
                            <Button colorScheme='white' variant={"outline"} onClick={() => handlePlayButton()}>
                                < FaPause size={"24px"} />
                            </Button>
                    }

                    <Button colorScheme='white' variant={"outline"} onClick={() => handleClearButton(false)}>
                        <FaUndo size={"24px"} />
                    </Button>

                    <Button colorScheme='white' variant={"outline"} onClick={() => handleClearButton(true)}>
                        < FaRandom size={"24px"} />
                    </Button>

                </HStack>

            </Flex>
            <Heading size="xl" flex-position={"flex-end"}>Step: {step}</Heading>

        </Flex>
    );
};