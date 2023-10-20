/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import moment from "jalali-moment";

export function DateFaColumnFormatter(
  cellContent,
  row,
  rowIndex,
) {
  let dateFa = "";
  let dateLongFa = "";
  try {
    const date = new Date(cellContent);
    dateFa = !!cellContent ? moment.from(date,"en","YYYY/MM/DD"): "";
    dateLongFa = !!cellContent ? moment.from(date,"en","YYYY/MM/DD").locale(process.env.REACT_APP_DATE).format("dddd، DD MMMM YYYY"): "";
  } catch (error) {
    dateFa = "";
    dateLongFa = "";
  }

  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip id="specs-edit-tooltip">{dateLongFa}</Tooltip>}
      >
          <span className="svg-icon svg-icon-md svg-icon-primary">
              {!!dateFa ? dateFa.locale(process.env.REACT_APP_DATE).format("YYYY/MM/DD"): ""}
          </span>
      </OverlayTrigger>
    </>
  );
}
