/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../core/_helpers";

export function IdToTitleColumnFormatter(
  cellContent,
  row,
  rowIndex,
  { array }
) {

  return (
    <>
      <span>{!!array && !!cellContent && array.filter(x=>x.id==cellContent)[0].title}</span>
    </>
  );
}
