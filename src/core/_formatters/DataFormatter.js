import React from "react";

export function DataFormatter(cell, row, index, { t, data }) {
  return (
    <div>
      {data[cell]}
    </div>
  )
}