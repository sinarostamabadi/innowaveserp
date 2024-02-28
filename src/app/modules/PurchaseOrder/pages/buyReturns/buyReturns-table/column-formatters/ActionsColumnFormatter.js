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
    openEditBuyReturnPage,
    openDeleteBuyReturnDialog,
    openCancelAndReturnDialog,
    openAttachmentsDialog,
    openBuyReturnProfit,
    t,
  }
) => (
  <>
    <OverlayTrigger
      overlay={
        <Tooltip id="buyReturns-edit-tooltip">{t("Common.Edit")}</Tooltip>
      }
    >
      <a
        className="btn btn-icon btn-light btn-hover-primary btn-sm mr-2"
        onClick={() => openEditBuyReturnPage(row.BuyReturnId)}
      >
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG
            src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
          />
        </span>
      </a>
    </OverlayTrigger>
    {!!row.IsTemp && (
      <OverlayTrigger
        overlay={
          <Tooltip id="buyReturns-delete-tooltip">{t("Common.Delete")}</Tooltip>
        }
      >
        <a
          className="btn btn-icon btn-light btn-hover-danger btn-sm mr-2"
          onClick={() => openDeleteBuyReturnDialog(row.BuyReturnId)}
        >
          <span className="svg-icon svg-icon-md svg-icon-danger">
            <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")} />
          </span>
        </a>
      </OverlayTrigger>
    )}

    <OverlayTrigger
      overlay={
        <Tooltip id="buyReturns-delete-tooltip">
          {t("Common.Attachments")}
        </Tooltip>
      }
    >
      <a
        className="btn btn-icon btn-light btn-hover-success btn-sm mr-2"
        onClick={() => openAttachmentsDialog(row.BuyReturnId)}
      >
        <span className="svg-icon svg-icon-md svg-icon-success">
          <i className="fas fa-paperclip text-success"></i>
        </span>
      </a>
    </OverlayTrigger>
    {/* <OverlayTrigger
      overlay={<Tooltip id="buyReturns-delete-tooltip">پرداخت</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-hover-danger btn-sm mr-2"
        onClick={() => openDeleteBuyReturnDialog(row.BuyReturnId)}
      >
        <span className="svg-icon svg-icon-md svg-icon-danger">
          <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Dollar.svg")} />
        </span>
      </a>
    </OverlayTrigger>
    <OverlayTrigger
      overlay={<Tooltip id="buyReturns-delete-tooltip">صدور سند</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-hover-danger btn-sm mr-2"
        onClick={() => openDeleteBuyReturnDialog(row.BuyReturnId)}
      >
        <i className="fas fa-trash-alt text-danger"></i>
      </a>
    </OverlayTrigger>
    <OverlayTrigger
      overlay={<Tooltip id="buyReturns-delete-tooltip">بستن</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-hover-danger btn-sm mr-2"
        onClick={() => openDeleteBuyReturnDialog(row.BuyReturnId)}
      >
        <i className="fas fa-trash-alt text-danger"></i>
      </a>
    </OverlayTrigger>
    <OverlayTrigger
      overlay={<Tooltip id="buyReturns-delete-tooltip">لغو</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-hover-danger btn-sm mr-2"
        onClick={() => openDeleteBuyReturnDialog(row.BuyReturnId)}
      >
        <i className="fas fa-trash-alt text-danger"></i>
      </a>
    </OverlayTrigger>
    <OverlayTrigger
      overlay={<Tooltip id="buyReturns-delete-tooltip">خروج از حالت موقت</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-hover-danger btn-sm mr-2"
        onClick={() => openDeleteBuyReturnDialog(row.BuyReturnId)}
      >
        <i className="fas fa-trash-alt text-danger"></i>
      </a>
    </OverlayTrigger> */}
  </>
);
