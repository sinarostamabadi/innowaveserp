/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { numberWithCommas } from "../_helpers";

export function NumberCommaSeparateFormatter(cellContent, row, rowIndex) {
  return (
    <span className="dir-ltr d-inline-block">
      {numberWithCommas(cellContent)}
    </span>
  );
}
