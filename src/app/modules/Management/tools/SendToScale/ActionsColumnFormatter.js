/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */

import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../core/_helpers";

export const ActionsColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  {
    gotoSellPricing,
    t,
  }
) => (
  <>
    <OverlayTrigger
      overlay={<Tooltip id="brands-edit-tooltip">{t("Common.New")}</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
        onClick={() => {
          gotoSellPricing();
        }}
      >
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG
            src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
          />
        </span>
      </a>
    </OverlayTrigger>
  </>
);
