/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */

import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../core/_helpers";

export const ActionsColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  { openEditEmployeeTypePage, openDeleteEmployeeTypeDialog, t }
) => (
  <>
    <OverlayTrigger
      overlay={
        <Tooltip id="employeeTypes-edit-tooltip">{t("Common.Edit")}</Tooltip>
      }
    >
      <a
        className="btn btn-icon btn-light btn-hover-primary btn-sm"
        onClick={() => openEditEmployeeTypePage(row.BodyBuildingEmployeeTypeId)}
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
        <Tooltip id="employeeTypes-delete-tooltip">
          {t("Common.Delete")}
        </Tooltip>
      }
    >
      <a
        className="btn btn-icon btn-light btn-hover-danger btn-sm mr-1"
        onClick={() =>
          openDeleteEmployeeTypeDialog(row.BodyBuildingEmployeeTypeId)
        }
      >
        <i className="fas fa-trash-alt text-danger"></i>
      </a>
    </OverlayTrigger>
  </>
);
