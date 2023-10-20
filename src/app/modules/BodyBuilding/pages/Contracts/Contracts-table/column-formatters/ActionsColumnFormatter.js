import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../core/_helpers";

export const ActionsColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  { openEditContractPage, openDeleteContractDialog, openShowContractDialog, t }
) => (
  <>
    <OverlayTrigger overlay={<Tooltip id="contracts-edit-tooltip">{t("Common.Edit")}</Tooltip>}>
      <a
        className="btn btn-icon btn-light btn-hover-primary btn-sm"
        onClick={() => openEditContractPage(row.BodyBuildingContractId)}
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
      overlay={<Tooltip id="contracts-delete-tooltip">{t("Common.Delete")}</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-hover-danger btn-sm mr-1"
        onClick={() => openDeleteContractDialog(row.BodyBuildingContractId)}
      >
        <i className="fas fa-trash-alt text-danger"></i>
      </a>
    </OverlayTrigger>
    <> </>
    <OverlayTrigger
      overlay={<Tooltip id="contracts-delete-tooltip">{t("Common.Show")}</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-hover-info btn-sm mr-1"
        onClick={() => openShowContractDialog(row.BodyBuildingContractId)}
      >
        <i className="fas fa-eye text-info"></i>
      </a>
    </OverlayTrigger>
  </>
);