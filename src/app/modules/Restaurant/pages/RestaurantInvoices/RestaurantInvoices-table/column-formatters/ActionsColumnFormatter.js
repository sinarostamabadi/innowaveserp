/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */

import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export const ActionsColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  {
    openDisplayPage,
    openEditPage,
    openDeleteDialog,
    openCheckoutDialog,
    openDeliveryDialog,
    openrelocationDialog,
    openReleaseDialog,
    openCancelOrderDialog,
    openCancelAndReorderDialog,
    t,
  }
) => (
  <>
    {/* لغو و سفارش مجدد */}
    {[1, 2].indexOf(row.RestaurantInvoiceStatusId) > -1 ? (
      <OverlayTrigger
        overlay={
          <Tooltip id="restaurantInvoices-edit-tooltip">
            {t("Common.CancelAndReorder")}
          </Tooltip>
        }
      >
        <a
          className="btn btn-icon btn-light btn-hover-success btn-sm"
          onClick={() => openCancelAndReorderDialog(row.RestaurantInvoiceId)}
        >
          <span className="svg-icon svg-icon-md svg-icon-success">
            <i className="fas fa-redo text-danger"></i>
          </span>
        </a>
      </OverlayTrigger>
    ) : (
      <></>
    )}

    {/* لغو سفارش */}
    {[1, 2].indexOf(row.RestaurantInvoiceStatusId) > -1 ? (
      <OverlayTrigger
        overlay={
          <Tooltip id="restaurantInvoices-edit-tooltip">
            {t("Common.CancelOrder")}
          </Tooltip>
        }
      >
        <a
          className="btn btn-icon btn-light btn-hover-primary btn-sm"
          onClick={() => openCancelOrderDialog(row.RestaurantInvoiceId)}
        >
          <span className="svg-icon svg-icon-md svg-icon-success">
            <i className="fas fa-times text-danger"></i>
          </span>
        </a>
      </OverlayTrigger>
    ) : (
      <></>
    )}

    {/* آزادسازی بدون تسویه */}
    {[2].indexOf(row.RestaurantInvoiceStatusId) > -1 ? (
      <OverlayTrigger
        overlay={
          <Tooltip id="restaurantInvoices-edit-tooltip">
            {t("Common.ReleaseWithoutCheckout")}
          </Tooltip>
        }
      >
        <a
          className="btn btn-icon btn-light btn-hover-primary btn-sm"
          onClick={() => openReleaseDialog(row.RestaurantInvoiceId)}
        >
          <span className="svg-icon svg-icon-md svg-icon-success">
            <i className="fas fa-bell-exclamation text-info"></i>
          </span>
        </a>
      </OverlayTrigger>
    ) : (
      <></>
    )}

    {/* جابجایی میز */}
    {[1, 2].indexOf(row.RestaurantInvoiceStatusId) > -1 ? (
      <OverlayTrigger
        overlay={
          <Tooltip id="restaurantInvoices-edit-tooltip">
            {t("Common.Relocation")}
          </Tooltip>
        }
      >
        <a
          className="btn btn-icon btn-light btn-hover-primary btn-sm"
          onClick={() => openrelocationDialog(row.RestaurantInvoiceId)}
        >
          <span className="svg-icon svg-icon-md svg-icon-success">
            <i className="fas fa-exchange text-warning"></i>
          </span>
        </a>
      </OverlayTrigger>
    ) : (
      <></>
    )}

    {/* تحویل سفارش */}
    {[1].indexOf(row.RestaurantInvoiceStatusId) > -1 ? (
      <OverlayTrigger
        overlay={
          <Tooltip id="restaurantInvoices-delete-tooltip">
            {t("Common.Delivery")}
          </Tooltip>
        }
      >
        <a
          className="btn btn-icon btn-light btn-hover-danger btn-sm"
          onClick={() => openDeliveryDialog(row.RestaurantInvoiceId)}
        >
          <span className="svg-icon svg-icon-md svg-icon-success">
            <i className="fas fa-concierge-bell text-success"></i>
          </span>
        </a>
      </OverlayTrigger>
    ) : (
      <></>
    )}

    {/* تسویه حساب */}
    {/* {[2, 4].indexOf(row.RestaurantInvoiceStatusId) > -1 ? ( */}
    <OverlayTrigger
      overlay={
        <Tooltip id="restaurantInvoices-edit-tooltip">
          {t("Common.Checkout")}
        </Tooltip>
      }
    >
      <a
        className="btn btn-icon btn-light btn-hover-success btn-sm"
        onClick={() => openCheckoutDialog(row.RestaurantInvoiceId)}
      >
        <span className="svg-icon svg-icon-md svg-icon-success">
          <i className="fas fa-sack-dollar text-success"></i>
        </span>
      </a>
    </OverlayTrigger>
    {/* ) : (
      <></>
    )} */}

    {/* نمایش */}
    <OverlayTrigger
      overlay={
        <Tooltip id="restaurantInvoices-edit-tooltip">
          {t("Common.Show")}
        </Tooltip>
      }
    >
      <a
        className="btn btn-icon btn-light btn-hover-primary btn-sm"
        onClick={() => openDisplayPage(row.RestaurantInvoiceId)}
      >
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <i className="fas fa-eye text-primary"></i>
        </span>
      </a>
    </OverlayTrigger>
  </>
);
