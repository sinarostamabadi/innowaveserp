import { numberWithCommas } from "src/core/_helpers";

export function TotalCountColumnFormatter(cellContent, row, rowIndex, { t }) {
  return numberWithCommas(row.Price * row.ServiceCount);
}
