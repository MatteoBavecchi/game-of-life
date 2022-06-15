import React, { useEffect } from 'react';
import './App.css';
import {
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
  Input
} from '@chakra-ui/react';

import { RootState } from './Redux/Store/Store';
import { useSelector, useDispatch } from 'react-redux'

import { initializeGrid, setColumns, setGrid, setRows } from './Redux/Features/Game';
import { setStep } from './Redux/Features/Step';

import { TextFileParserType } from './Types/Utils';
import { textFileParser } from './Utils/Utils';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import GameGrid from './components/Grid/GameGrid';


function App() {

  useEffect(() => {
    //After startup first we create a default 20x40 grid 
    dispatch(setRows(20));
    dispatch(setColumns(40));
    dispatch(initializeGrid({ rand: false }));
  }, []);

  const grid = useSelector((state: RootState) => state.game.grid);
  const rows = useSelector((state: RootState) => state.game.rows);
  const cols = useSelector((state: RootState) => state.game.cols);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch()

  const onUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    //The method return a promise
    textFileParser(event).then((res: TextFileParserType | null) => {
      //If the result is not null we dispatch the actions for update data
      if (res !== null) {
        dispatch(setColumns(res.cols));
        dispatch(setRows(res.rows));
        dispatch(setStep(res.step));
        dispatch(setGrid(res.newGrid));
      } else {
        alert("Error during file parsing");
      }
    });
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
              <Input type="file" onChange={(event) => onUpload(event)} />
            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                onClose();
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default App;
