/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../core/_helpers";

export function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,
  { openEditDetailDialog, openDeleteDetailDialog, t, mode }
) {
  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip id="specs-edit-tooltip">{t("Common.Edit")}</Tooltip>}
      >
        <a
          className="btn btn-icon btn-light btn-hover-primary btn-sm mx-1"
          onClick={() => openEditDetailDialog(row.BuyRequestDetailId)}
        >
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
            />
          </span>
        </a>
      </OverlayTrigger>
      <> </>

      {mode == 0 && (
        <OverlayTrigger
          overlay={
            <Tooltip id="spec-delete-tooltip">{t("Common.Delete")}</Tooltip>
          }
        >
          <a
            className="btn btn-icon btn-light btn-hover-danger btn-sm"
            onClick={() => {
              openDeleteDetailDialog(row.BuyRequestDetailId);
            }}
          >
            <span className="svg-icon svg-icon-md svg-icon-danger">
              <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")} />
            </span>
          </a>
        </OverlayTrigger>
      )}
    </>
  );
}
