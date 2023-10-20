/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */

import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../core/_helpers";

export const ActionsColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  {
    openEditSellDocumentPage,
    openDeleteSellDocumentDialog,
    openCancelAndResellDialog,
    openShowPage,
    t,
  }
) => (
  <>
    {/* لغو و سفارش مجدد */}
    {!row.IsTemp && !row.IsCanceled && (
      <OverlayTrigger
        overlay={
          <Tooltip id="tooltip-CancelAndResell">
            {t("Common.CancelAndResell")}
          </Tooltip>
        }
      >
        <a
          className="btn btn-icon btn-light btn-hover-success btn-sm mr-2"
          onClick={() => openCancelAndResellDialog(row.SellDocumentId)}
        >
          <span className="svg-icon svg-icon-md svg-icon-success">
            <i className="fas fa-redo text-danger"></i>
          </span>
        </a>
      </OverlayTrigger>
    )}

    {row.IsTemp && (
      <>
        <OverlayTrigger
          overlay={<Tooltip id="tooltip-Edit">{t("Common.Edit")}</Tooltip>}
        >
          <a
            className="btn btn-icon btn-light btn-hover-primary btn-sm mr-2"
            onClick={() => openEditSellDocumentPage(row.SellDocumentId)}
          >
            <span className="svg-icon svg-icon-md svg-icon-primary">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
              />
            </span>
          </a>
        </OverlayTrigger>
        <OverlayTrigger
          overlay={
            <Tooltip id="sellDocuments-delete-tooltip">
              {t("Common.Delete")}
            </Tooltip>
          }
        >
          <a
            className="btn btn-icon btn-light btn-hover-danger btn-sm mr-2"
            onClick={() => openDeleteSellDocumentDialog(row.SellDocumentId)}
          >
            <span className="svg-icon svg-icon-md svg-icon-danger">
              <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")} />
            </span>
          </a>
        </OverlayTrigger>
      </>
    )}
    
    <OverlayTrigger
          overlay={<Tooltip id="tooltip-Edit">{t("Common.Show")}</Tooltip>}
        >
          <a
            className="btn btn-icon btn-light btn-hover-primary btn-sm "
            onClick={() => openShowPage(`/Sell/sellDocuments/${row.SellDocumentId}/show`)}
          >
            <span className="svg-icon svg-icon-md svg-icon-primary">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/General/Visible.svg")}
              />
            </span>
          </a>
        </OverlayTrigger>
  </>
);
