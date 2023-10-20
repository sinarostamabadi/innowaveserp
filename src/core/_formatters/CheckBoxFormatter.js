import React from "react";

export function CheckBoxFormatter(cell, row, index, { t, positive, negetive }) {
  const calcualteCellValue = () => {
    if (cell) {
      return <span>{positive}</span>
    } else {
      return <span>{negetive}</span>
    }
  }

  return (
    <div>
      {calcualteCellValue()}
    </div>
  )
}