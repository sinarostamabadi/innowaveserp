/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../core/_helpers";

export function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,
  {
    openEditBowlingTeamPersonDialog,
    openDeleteBowlingTeamPersonDialog,
    openSerialBowlingTeamPersonDialog,
    t,
  }
) {
  return (
    <>
      <OverlayTrigger
        overlay={
          <Tooltip id="spec-delete-tooltip">{t("Common.Delete")}</Tooltip>
        }
      >
        <a
          className="btn btn-icon btn-light btn-hover-danger btn-sm"
          onClick={() => {
            openDeleteBowlingTeamPersonDialog(row.BowlingTeamPersonScoreId);
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
