/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */

import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../core/_helpers";

export const ActionsColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  { openDeleteRealPersonDialog, t }
) => {
  return (
    <>
      <OverlayTrigger
        overlay={
          <Tooltip id="realPersons-delete-tooltip">
            {t("Common.Delete")}
          </Tooltip>
        }
      >
        <a
          className="btn btn-icon btn-light btn-hover-danger btn-sm"
          onClick={() => openDeleteRealPersonDialog(cellContent)}
        >
          <i className="fas fa-trash-alt text-danger"></i>
        </a>
      </OverlayTrigger>
    </>
  );
};
