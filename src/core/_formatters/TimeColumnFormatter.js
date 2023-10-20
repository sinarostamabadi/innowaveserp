/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import moment from "jalali-moment";

export function TimeColumnFormatter(
  cellContent,
  row,
  rowIndex,
) {
    let timeLongFa = !!cellContent ? cellContent.toString().substring(0, 8): "";
    let timeShortFa = !!cellContent ? cellContent.toString().substring(0, 5): "";
  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip id="specs-edit-tooltip">{timeLongFa}</Tooltip>}
      >
          <span className="svg-icon svg-icon-md svg-icon-primary">
              {timeShortFa}
          </span>
      </OverlayTrigger>
    </>
  );
}
