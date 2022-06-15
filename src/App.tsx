import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import {
  Heading,
  Flex,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  useDisclosure,
  Button,
  Text,
  Input
} from '@chakra-ui/react';
import { RootState } from './Redux/Store/Store';
import { useSelector, useDispatch } from 'react-redux'
import { initializeGrid, setColumns, setRows } from './Redux/Features/Game';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import GameGrid from './components/Grid/GameGrid';
import { FaCloud, FaGrinSquint } from 'react-icons/fa';


function App() {

  useEffect(() => {
    dispatch(setRows(20));
    dispatch(setColumns(40));
    dispatch(initializeGrid({ rand: false }));
  }, []);

  const grid = useSelector((state: RootState) => state.game.grid);
  const rows = useSelector((state: RootState) => state.game.rows);
  const cols = useSelector((state: RootState) => state.game.cols);

  const [widthError, setWidthError] = useState(false);
  const [heightError, setHeightError] = useState(false);


  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch()

  useEffect(() => {
    // Update the document title using the browser API
    // dispatch(setRows(40));
    //dispatch(setColumns(30));
    console.table(grid);

  });

  const handleSave = () => {



  }

  return (
    <Box>
      <Header handleOpen={onOpen}></Header>
      <Flex
        w="100%"
        justifyContent="center"
        style={{ margin: "auto" }}
        direction="column"
        align="center"
        maxW={{ xl: "1200px" }}
        m="0 auto"
      >
        {grid && <GameGrid rows={rows} cols={cols} grid={grid}></GameGrid>}
      </Flex>
      <Footer></Footer>


      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent as="div">
          <ModalHeader as="div">Import settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mb={2}>
              <FormLabel>Width: {cols}</FormLabel>
              <FormLabel>height: {rows}</FormLabel>
            </FormControl>

            <FormControl mb={2} >
              <Button leftIcon={<FaCloud />} colorScheme='teal' variant='solid'>
                Upload file
              </Button>
            </FormControl>


          </ModalBody>

          <ModalFooter>
            <Button
              backgroundColor="#2B5F38"
              color="white"
              mr={3}
              onClick={() => {
                handleSave();
                onClose();
              }}
              _hover={{ background: "#21452A" }}
              _activeLink={{ background: "#21452A" }}
              _active={{ background: "#21452A" }}
              _focus={{ background: "#21452A" }}
            >
              Save
            </Button>

            <Button
              onClick={() => {
                setHeightError(false);
                setWidthError(false);
                onClose();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default App;
