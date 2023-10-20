/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import moment from "jalali-moment";

export function DateTimeFaColumnFormatter(
  cellContent,
  row,
  rowIndex,
) {
  let dateFa = "";
  let timeClear = "";
  try {
    const date = new Date(cellContent);
    dateFa = !!cellContent ? moment.from(date,"en"): "";
    timeClear = !!cellContent ? moment.from(date,"en").locale(process.env.REACT_APP_DATE).format("YYYY/MM/DD HH:mm:ss"): "";
  } catch (error) {
    dateFa = "";
    timeClear = "";
  }

  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip id="specs-edit-tooltip">{timeClear}</Tooltip>}
      >
          <span className="dir-ltr d-inline-block">
              {!!dateFa ? dateFa.locale(process.env.REACT_APP_DATE).format("YYYY/MM/DD - HH:mm"): ""}
          </span>
      </OverlayTrigger>
    </>
  );
}
