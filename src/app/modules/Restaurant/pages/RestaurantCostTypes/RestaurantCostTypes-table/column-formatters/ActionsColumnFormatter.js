/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */

import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../core/_helpers";

export const ActionsColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  { openEditRestaurantCostTypePage, openDeleteRestaurantCostTypeDialog, t }
) => (
  <>
    <OverlayTrigger
      overlay={
        <Tooltip id="restaurantCostTypes-edit-tooltip">
          {t("Common.Edit")}
        </Tooltip>
      }
    >
      <a
        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
        onClick={() => openEditRestaurantCostTypePage(row.RestaurantCostTypeId)}
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
        <Tooltip id="restaurantCostTypes-delete-tooltip">
          {t("Common.Delete")}
        </Tooltip>
      }
    >
      <a
        className="btn btn-icon btn-light btn-hover-danger btn-sm"
        onClick={() =>
          openDeleteRestaurantCostTypeDialog(row.RestaurantCostTypeId)
        }
      >
        <span className="svg-icon svg-icon-md svg-icon-danger">
          <SVG src={toAbsoluteUrl("/media/svg/icons//Trash.svg")} />
        </span>
      </a>
    </OverlayTrigger>
  </>
);
