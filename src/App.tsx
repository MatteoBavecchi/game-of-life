import React, { useEffect } from 'react';
import './App.css';
import { Heading, Flex, Box } from '@chakra-ui/react';
import { RootState } from './Redux/Store/Store';
import { useSelector, useDispatch } from 'react-redux'
import { initializeGrid, setColumns, setRows } from './Redux/Features/Game';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import GameGrid from './components/Grid/GameGrid';


function App() {
  const grid = useSelector((state: RootState) => state.game.grid);

  const dispatch = useDispatch()

  useEffect(() => {
    // Update the document title using the browser API
    dispatch(setRows(40));
    dispatch(setColumns(30));
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
        <Heading>Hello world</Heading>
        <div>
          <div>
            <button onClick={() => dispatch(initializeGrid({ rand: true }))}>Init</button>
          </div>
        </div>

        <GameGrid rows={30} cols={40} grid={grid}></GameGrid>
      </Flex>
      <Footer></Footer>
    </Box>
  );
}

export default App;
