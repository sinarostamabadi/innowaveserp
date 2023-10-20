/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */

import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../core/_helpers";

export const ActionsColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  { openEditAssignmentPage, openDeleteAssignmentDialog, t }
) => (
  <>
    <OverlayTrigger overlay={<Tooltip id="assignments-edit-tooltip">{t("Common.Show")}</Tooltip>}>
      <a
        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
        onClick={() => openEditAssignmentPage(row.AssignmentId)}
      >
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG
            title={t("Common.Show")}
            src={toAbsoluteUrl("/media/svg/icons/General/Visible.svg")}
          />
        </span>
      </a>
    </OverlayTrigger>
    <> </>
    {/* <OverlayTrigger
      overlay={<Tooltip id="assignments-delete-tooltip">{t("Common.Delete")}</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-hover-danger btn-sm"
        onClick={() => openDeleteAssignmentDialog(row.AssignmentId)}
      >
        <i className="fas fa-trash-alt text-danger"></i>
      </a>
    </OverlayTrigger> */}
  </>
);