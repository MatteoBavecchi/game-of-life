import React, { useEffect } from "react";

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
import { initializeGrid, nextGrid, setColumns, setRows } from "../../Redux/Features/Game";

export const Header = () => {

    const dispatch = useDispatch()
    const step = useSelector((state: RootState) => state.step.step);
    const isRunning = useSelector((state: RootState) => state.step.isRunning);
    const timerId = useSelector((state: RootState) => state.step.timerId);

   
    const handleButton = () => {

        if (isRunning) {
            dispatch(pause());
            clearInterval(timerId);
            dispatch(setTimerId(0));
            return;
        }
        dispatch(play());
        const newTimerId = setInterval(() => {
            dispatch(increment());
            dispatch(nextGrid());
        }, 500);
        dispatch(setTimerId(newTimerId));
    }


    const clear = (rand: boolean) => {
        if (isRunning) {
            handleButton();
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
                <Heading size="xl" ml="10px" mr="60px">
                    Game of Life
                </Heading>
                <HStack spacing='24px'>
                    <Button leftIcon={<FaFileUpload />} colorScheme='yellow' >
                        Import
                    </Button>
                    {
                        !isRunning ?
                            <Button colorScheme='white' variant={"outline"} onClick={() => handleButton()} >
                                < FaPlay size={"24px"} />
                            </Button> :
                            <Button colorScheme='white' variant={"outline"} onClick={() => handleButton()}>
                                < FaPause size={"24px"} />
                            </Button>
                    }

                    <Button colorScheme='white' variant={"outline"} onClick={() => clear(false)}>
                        <FaUndo size={"24px"} />
                    </Button>

                    <Button colorScheme='white' variant={"outline"} onClick={() => clear(true)}>
                        < FaRandom size={"24px"} />
                    </Button>

                </HStack>

            </Flex>
            <Heading size="xl" flex-position={"flex-end"}>Step: {step}</Heading>
            
        </Flex>
    );
};