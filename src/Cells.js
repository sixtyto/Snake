import React from "react";
import { rows, cols, cell, body, food } from "./Config";

function Cells({ board, handleKey }) {
  const cells = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const value = board[cols * row + col];
      const className =
        value === body ? `cell-body` : value === food ? `cell-food` : `cell`;
      cells.push(<div key={cols * row + col} className={className} />);
    }
  }
  return (
    <div
      onKeyDown={handleKey}
      tabIndex={0}
      style={{ width: cols * cell, height: rows * cell }}
      className="board"
    >
      {cells}
    </div>
  );
}

export default Cells;
