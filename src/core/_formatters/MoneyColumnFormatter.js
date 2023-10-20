/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { numberWithCommas } from "../_helpers";

export function MoneyColumnFormatter(cellContent, row, rowIndex) {
  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip id="specs-edit-tooltip">{!!cellContent > 0 ? numberWithCommas(cellContent.toString().substring(0, cellContent.toString().length - 1)): "0"} تومان</Tooltip>}
      >
        <span className="dir-ltr d-inline-block">
          {numberWithCommas(Math.ceil(cellContent))}
        </span>
      </OverlayTrigger>
    </>
  );
}
