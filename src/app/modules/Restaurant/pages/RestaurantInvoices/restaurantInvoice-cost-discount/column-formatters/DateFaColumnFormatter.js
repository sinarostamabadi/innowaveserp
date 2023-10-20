/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import moment from "jalali-moment";

export function DateFaColumnFormatter(
  cellContent,
  row,
  rowIndex,
  {field}
) {
    let dateFa = moment.from(
        row[field],
        "en",
        "YYYY/MM/DD"
      );
  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip id="specs-edit-tooltip">{cellContent}</Tooltip>}
      >
          <span className="svg-icon svg-icon-md svg-icon-primary">
              {dateFa.local(process.env.REACT_APP_DATE).format("YYYY/MM/DD")}
          </span>
      </OverlayTrigger>
    </>
  );
}
