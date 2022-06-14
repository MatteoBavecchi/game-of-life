import React from "react";
import { Box, Link, Text, useColorMode } from "@chakra-ui/react";

export const Footer = () => {
    const { colorMode } = useColorMode();
    return (
        <Box
            as="footer"
            pr={2}
            bg={`mode.${colorMode}.box`}
            justifyContent="flex-end"
            display="flex"
            borderTop={`1px ${colorMode === "light" ? "#dddddd" : "000000"} solid`}
        >
            <Text color={`mode.${colorMode}.text`}>
                © Matteo Bavecchi - Extendi
            </Text>
        </Box>
    );
};