import { Box, Text } from "@chakra-ui/react";

export const Footer = () => {
    return (
        <Box
            bottom={0}
            as="footer"
            pr={2}
            bg={`#fff`}
            justifyContent="flex-end"
            display="flex"
            borderTop={`1px #ddd solid`}
        >
            <Text color={`#000`}>
                © Matteo Bavecchi - Extendi
            </Text>
        </Box>
    );
};