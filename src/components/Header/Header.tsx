import React from "react";

import {
    Heading,
    Flex,
    Button,
    HStack
} from "@chakra-ui/react";

import { FaPlay, FaRandom, FaFileUpload, FaPause } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/Store/Store";

import { play, pause, increment } from "../../Redux/Features/Step";
import { initializeGrid, nextGrid, setColumns, setRows } from "../../Redux/Features/Game";

export const Header = () => {
    const dispatch = useDispatch()
    const step = useSelector((state: RootState) => state.step.step);
    const isRunning = useSelector((state: RootState) => state.step.isRunning);

    const handlePlay = () => {
        let myInterval = setInterval(() => {
            dispatch(play());
            dispatch(increment());
            dispatch(nextGrid());
        }, 500);
    }
    const handlePause = () => {
        // clearInterval(myInterval);
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
                            <Button colorScheme='white' variant={"outline"} onClick={() => handlePlay()} >
                                < FaPlay size={"24px"} />
                            </Button> :
                            <Button colorScheme='white' variant={"outline"} onClick={() => handlePause()}>
                                < FaPause size={"24px"} />
                            </Button>
                    }
                    <Button colorScheme='white' variant={"outline"} onClick={() => dispatch(initializeGrid({ rand: true }))}>
                        < FaRandom size={"24px"} />
                    </Button>
                    <Button colorScheme='white' variant={"outline"} >
                        Next
                    </Button>
                </HStack>

            </Flex>
            <Heading size="xl" flex-position={"flex-end"}>Step: {step}</Heading>
        </Flex>
    );
};