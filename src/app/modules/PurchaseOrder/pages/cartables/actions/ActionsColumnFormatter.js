/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */

import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../core/_helpers";

export const ActionsColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  { approve, deny, show, t }
) => (
  <>
    {/* <OverlayTrigger overlay={<Tooltip id="buyRequests-edit-tooltip">{t("Common.Approve")}</Tooltip>}>
      <a
        className="btn btn-icon btn-light btn-hover-success btn-sm"
        onClick={() => approve(row.BuyRequestId)}
      >
        <span className="svg-icon svg-icon-md svg-icon-success">
          <SVG
            src={toAbsoluteUrl("/media/svg/icons/Code/Done-circle.svg")}
            title={t("Common.Approve")}
          />
        </span>
      </a>
    </OverlayTrigger>
    <> </>
    <OverlayTrigger
      overlay={<Tooltip id="buyRequests-delete-tooltip">{t("Common.Deny")}</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-hover-danger btn-sm "
        onClick={() => deny(row.BuyRequestId)}
      >
        <span className="svg-icon svg-icon-md svg-icon-danger">
          <SVG src={toAbsoluteUrl("/media/svg/icons/Code/Error-circle.svg")} title={t("Common.Deny")}/>
        </span>
      </a>
    </OverlayTrigger>
    <> </> */}
    <OverlayTrigger
      overlay={
        <Tooltip id="buyRequests-delete-tooltip">{t("Common.Show")}</Tooltip>
      }
    >
      <a
        className="btn btn-icon btn-light btn-hover-primary btn-sm"
        onClick={() => show(row.BuyRequestId)}
      >
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG
            src={toAbsoluteUrl("/media/svg/icons/General/Visible.svg")}
            title={t("Common.Show")}
          />
        </span>
      </a>
    </OverlayTrigger>
  </>
);
