import React from 'react';
import Row from './row';


const Grid = (props) => {

  const { updateCell, updateMark, updateWin, draw, restart } = props;

  const renderGrid = () => {
    return props.grid.map((row, i) => {
      return (
        <Row 
          row={row}
          rowIdx={i}
          updateCell={updateCell}
          updateMark={updateMark}
          updateWin={updateWin}
          draw={draw}
          restart={restart}/>
      )
    });
  };

    return (
        <div className="flex-center">
          {renderGrid()}
        </div>
    )
}

export default Grid;