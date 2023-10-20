/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */

import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "src/core/_helpers";

export const ActionsColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  { goLevel, setSteps, t }
) => (
  <>
    {row.LevelReport != 10 && (
      <OverlayTrigger
        overlay={
          <Tooltip id="documents-edit-tooltip">{t("Common.Show")}</Tooltip>
        }
      >
        <a
          className="btn btn-icon btn-light btn-hover-info btn-sm mx-3"
          onClick={() => {
            goLevel({
              LevelReport: +row.LevelReport + 1 < 4 ? +row.LevelReport + 1 : 10,
              AccountId: row.AccountId,
            });
            setSteps([row]);
          }}
        >
          <span className="svg-icon svg-icon-md svg-icon-info">
            <i className="fas fa-eye text-info"></i>
          </span>
        </a>
      </OverlayTrigger>
    )}
  </>
);
