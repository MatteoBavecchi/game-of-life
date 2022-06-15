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
  Input,
  useToast
} from '@chakra-ui/react';


import { RootState } from './Redux/Store/Store';
import { useSelector, useDispatch } from 'react-redux'

import { initializeGrid, setColumns, setGrid, setRows } from './Redux/Features/Game';
import { setStep } from './Redux/Features/Step';

import { TextFileParserType } from './Types/Utils';
import { textFileParser } from './Utils/Utils';

import { Header } from './components/Header/Header';
import GameGrid from './components/Grid/GameGrid';
import { FaCloud } from 'react-icons/fa';


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

  const toast = useToast()

  const dispatch = useDispatch()

  const onUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    //The method return a promise
    textFileParser(event).then((res: TextFileParserType) => {
      //If the result is correct we dispatch the actions for update data
      dispatch(setColumns(res.cols));
      dispatch(setRows(res.rows));
      dispatch(setStep(res.step));
      dispatch(setGrid(res.newGrid));
    }).then(() => {
      toast({
        title: 'File uploaded',
        description: "The file has benn successfully uploaded!",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }).catch(() => {
      toast({
        title: 'Something went wrong!',
        description: "The file was not correct!",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    })
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

      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent as="div">
          <ModalHeader as="div">Import settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>

            <FormControl mb={2} >

              <FormLabel
                border={'1px solid #ccc'}
                display={'inline-block'}
                mt={2}
                padding={'6px 12px'}
                cursor={'pointer'}
                htmlFor='inputFile'
              >
                <FaCloud style={{ float: "left" }} size="24px"></FaCloud> Upload file</FormLabel>
              <Input style={{ display: 'none' }} id="inputFile" type="file" onChange={(event) => onUpload(event)} />
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
