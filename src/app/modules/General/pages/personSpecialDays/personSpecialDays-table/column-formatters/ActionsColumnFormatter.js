import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../core/_helpers";

export const ActionsColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  { openEditPersonSpecialDayPage, openDeletePersonSpecialDayDialog, t }
) => (
  <>
    <OverlayTrigger
      overlay={
        <Tooltip id="personSpecialDays-edit-tooltip">
          {t("Common.Edit")}
        </Tooltip>
      }
    >
      <a 
        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
        onClick={() => openEditPersonSpecialDayPage(row.PersonSpecialDayId)}
      >
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG
            src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
          />
        </span>
      </a>
    </OverlayTrigger>
    <> </>
    <OverlayTrigger
      overlay={
        <Tooltip id="personSpecialDays-delete-tooltip">
          {t("Common.Delete")}
        </Tooltip>
      }
    >
      <a
        className="btn btn-icon btn-light btn-hover-danger btn-sm"
        onClick={() => openDeletePersonSpecialDayDialog(row.PersonSpecialDayId)}
      >
        <i className="fas fa-trash-alt text-danger"></i>
      </a>
    </OverlayTrigger>
  </>
);
