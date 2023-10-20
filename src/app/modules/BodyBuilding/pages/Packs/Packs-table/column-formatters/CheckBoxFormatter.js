import React from "react";

export function CheckBoxFormatter(cell, row, index, { t }) {
  const calcualteCellValue = () => {
    if (cell) {
      return <span>{t("Common.Have")}</span>
    } else {
      return <span>{t("Common.Havent")}</span>
    }
  }

  return (
    <div>
      {calcualteCellValue()}
    </div>
  )
}