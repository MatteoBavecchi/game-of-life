import React from 'react';
import './App.css';
import { Heading, Flex, Slide } from '@chakra-ui/react';
import { RootState } from './Redux/Store/Store';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './Redux/Features/Game';

function App() {
  const count = useSelector((state: RootState) => state.game.value)
  const dispatch = useDispatch()
  return (
    <Flex
      w="100%"
      h="100vh"
      justifyContent="center"
    >
      <Heading>Hello world</Heading>
      <div>
        <div>
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <span>{count}</span>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
      </div>

    </Flex>
  );
}

export default App;
