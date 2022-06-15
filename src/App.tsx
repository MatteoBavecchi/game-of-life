import React, { useEffect } from 'react';
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
  Text
} from '@chakra-ui/react';
import { RootState } from './Redux/Store/Store';
import { useSelector, useDispatch } from 'react-redux'
import { initializeGrid, setColumns, setRows } from './Redux/Features/Game';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import GameGrid from './components/Grid/GameGrid';
import { FaGrinSquint } from 'react-icons/fa';


function App() {

  useEffect(() => {
    dispatch(setRows(20));
    dispatch(setColumns(40));
    dispatch(initializeGrid({ rand: false }));
  }, []);

  const grid = useSelector((state: RootState) => state.game.grid);
  const rows = useSelector((state: RootState) => state.game.rows);
  const cols = useSelector((state: RootState) => state.game.cols);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch()

  useEffect(() => {
    // Update the document title using the browser API
    // dispatch(setRows(40));
    //dispatch(setColumns(30));
    console.table(grid);

  });

  return (
    <Box>
      <Header></Header>
      <Flex
        w="100%"
        height={'calc(100vh - 90px)'}
        justifyContent="center"
      >
        {grid && <GameGrid rows={rows} cols={cols} grid={grid}></GameGrid>}
        <button onClick={onOpen}>Open modal</button>
      </Flex>
      <Footer></Footer>


      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent as="div">
          <ModalHeader as="div">Aggiungi un piatto</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text fontSize="sm" color="#49576E" mb={4} lineHeight="normal">
              Potrai modificare queste informazioni ed altre ancora in un
              secondo momento.
            </Text>


          </ModalBody>

          <ModalFooter>

            <Button
              onClick={() => {
                onClose();
              }}
            >
              Annulla
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default App;
