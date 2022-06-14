import React from "react";
import { SimpleGrid, Box } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { toggleCell } from './../../Redux/Features/Game'

interface Props {
  rows: number,
  cols: number,
  grid: boolean[][]
}



const GameGrid: React.FC<Props> = ({ rows, cols, grid }) => {

  const dispatch = useDispatch();

  const handleCell = (x: number, y: number) => {
    dispatch(toggleCell({ x, y }));
  }
  return (

    <SimpleGrid
      style={{ transform: 'rotate(90deg)' }}
      data-testid="grid-wrapper"
      gridTemplateColumns={`repeat(${cols}, 20px)`}
      gridGap="2px"
      mt={4}
    >
      {grid &&
        grid.map((column, index) => (
          <SimpleGrid key={index} gridGap="2px">
            {column.map((cell: boolean, rowIndex: number) => (
              <Box
                onClick={() => handleCell(index, rowIndex)}
                key={rowIndex}
                data-testid="cell"
                width="20px"
                height="20px"
                backgroundColor={cell ? 'black' : 'gray.300'}
                cursor="pointer"
              />
            ))}
          </SimpleGrid>
        ))}
    </SimpleGrid>
  )
}
export default GameGrid;