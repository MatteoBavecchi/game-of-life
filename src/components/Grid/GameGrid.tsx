import React from "react";
import { SimpleGrid, Box } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { toggleCell } from './../../Redux/Features/Game'

interface GridProps {
  rows: number,
  cols: number,
  grid: boolean[][]
}

const GameGrid: React.FC<GridProps> = ({ rows, cols, grid }) => {

  const dispatch = useDispatch();

  const handleCell = (x: number, y: number) => {
    dispatch(toggleCell({ x, y }));
  }

  return (
    <SimpleGrid
      data-testid="grid-wrapper"
      gridTemplateColumns={`repeat(${cols}, 16px)`}
      gridGap="2px"
      mt={4}
    >
      {grid &&
        grid.map((column, index) => (
          <React.Fragment key={index}>
            {column.map((cell: boolean, rowIndex: number) => (
              <Box
                onClick={() => handleCell(index, rowIndex)}
                key={rowIndex}
                data-testid="cell"
                width="16px"
                height="16px"
                backgroundColor={cell ? 'black' : 'gray.300'}
                cursor="pointer"
              />
            ))}
          </React.Fragment>
        ))}
    </SimpleGrid>
  )
}
export default GameGrid;