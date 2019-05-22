import React from 'react';
import Cell from './cell';


const Row = props => {
  const {row, rowIdx, mark, updateCell, updateMark, updateWin, restart} = props;

  const renderRow = () => {
    return row.map((mark, j) => {
      return(
        <Cell
          pos={[rowIdx, j]}
          mark={mark}
          updateCell={updateCell}
          updateMark={updateMark}
          updateWin={updateWin}
          restart={restart}/>
      )
    });
  };

  return (
    <div className="flex-row">
      {renderRow()}
    </div>
  )
};

export default Row;
