/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */

import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../core/_helpers";

export const ActionsColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  { openEditBowlingCompetitionPage, openDeleteBowlingCompetitionDialog, t }
) => (
  <>
    <OverlayTrigger
      overlay={<Tooltip id="reserves-edit-tooltip">{t("Common.Show")}</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-hover-primary btn-sm"
        onClick={() => window.open(`/bowling/bowlingCompetitions/${row.BowlingCompetitionId}/standing`)}
      >
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG src={toAbsoluteUrl("/media/svg/icons/Devices/Display2.svg")} />
        </span>
      </a>
    </OverlayTrigger>
    <OverlayTrigger overlay={<Tooltip id="bowlingCompetitions-edit-tooltip">{t("Common.Show")}</Tooltip>}>
      <a
        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
        onClick={() => openEditBowlingCompetitionPage(row.BowlingCompetitionId)}
      >
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG
            src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
          />
        </span>
      </a>
    </OverlayTrigger>
    <OverlayTrigger
      overlay={<Tooltip id="bowlingCompetitions-delete-tooltip">{t("Common.Delete")}</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-hover-danger btn-sm"
        onClick={() => openDeleteBowlingCompetitionDialog(row.BowlingCompetitionId)}
      >
        <i className="fas fa-trash-alt text-danger"></i>
      </a>
    </OverlayTrigger>
  </>
);