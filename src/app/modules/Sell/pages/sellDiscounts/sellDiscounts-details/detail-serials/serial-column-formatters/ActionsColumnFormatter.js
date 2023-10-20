/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../../core/_helpers";

export function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,
  { actionDelete, t }
) {
  return (
    <>
      <OverlayTrigger
        overlay={
          <Tooltip id="serial-delete-tooltip">{t("Common.Delete")}</Tooltip>
        }
      >
        <a
          className="btn btn-icon btn-light btn-hover-danger btn-sm"
          onClick={() => {
            actionDelete(row);
          }}
        >
          <span className="svg-icon svg-icon-md svg-icon-danger">
            <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")} />
          </span>
        </a>
      </OverlayTrigger>
    </>
  );
}
