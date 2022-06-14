import React from "react";

import {
    Heading,
    Flex,
    Button,
    useColorMode,
    HStack
} from "@chakra-ui/react";

import { FaPlay, FaPause, FaFileUpload } from "react-icons/fa";

export const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();

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
                    <Button colorScheme='white' variant={"outline"}>
                        < FaPlay size={"24px"} />
                    </Button>
                    <Button colorScheme='white' variant={"outline"}>
                        < FaPause size={"24px"} />
                    </Button>
                </HStack>
              
            </Flex>
            <Heading  size="xl" flex-position={"flex-end"}>Step: 0</Heading>
        </Flex>
    );
};