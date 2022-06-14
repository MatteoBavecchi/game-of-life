import React from "react";
import { SimpleGrid, Box } from "@chakra-ui/react";

interface Props {
  rows: number,
  cols: number,
  grid: boolean[][]
}

const GameGrid: React.FC<Props> = ({ rows, cols, grid }) => {
  return (

    <SimpleGrid
      data-testid="grid-wrapper"
      gridTemplateColumns={`repeat(${cols}, 20px)`}
      gridGap="2px"
      mb="4rem"
    >
      {grid &&
        grid.map((column, index) => (
          <SimpleGrid key={index} className="column" data-testid="column" gridGap="2px">
            {grid[index].map((cell: boolean, rowIndex: number) => (
              <Box
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