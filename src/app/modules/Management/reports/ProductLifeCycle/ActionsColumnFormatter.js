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
    gotoEditBuy,
    gotoEditAssignment,
    gotoEditSellPricing,
    gotoEditReceipt,
    gotoEditSellDiscount,
    t,
  }
) => (
  <>
    <OverlayTrigger
      overlay={<Tooltip id="brands-edit-tooltip">{t("Common.Edit")}</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
        onClick={() => {
          switch (row.EntityTypeId) {
            case 2:
              gotoEditBuy(row.Id);
              break;
            case 3:
              gotoEditAssignment(row.Id);
              break;
            case 4:
              gotoEditSellPricing(row.Id);
              break;
            case 5:
              gotoEditReceipt(row.Id);
              break;
            case 6:
              gotoEditSellDiscount(row.Id);
              break;
            default:
              break;
          }
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
