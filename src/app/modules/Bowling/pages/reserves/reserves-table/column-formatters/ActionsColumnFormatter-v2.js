/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */

import React from "react";
import { OverlayTrigger, Tooltip, Popover, Button } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../core/_helpers";

export const ActionsColumnFormatterV2 = (
  cellContent,
  row,
  rowIndex,
  {
    openEditReservePage,
    openDeleteReserveDialog,
    openDoneReserveDialog,
    openAddTimeReserveDialog,
    openRelocationDialog,
    openCashDialog,
    t,
  }
) => (
  <>
    <OverlayTrigger
      trigger="click"
      placement="auto"
      rootClose={true}
      overlay={
        <Popover id="popover-basic" style={{ maxWidth: "300px" }}>
          <Popover.Content>
            <OverlayTrigger
              overlay={
                <Tooltip id="restaurantInvoices-edit-tooltip">
                  {t("Common.Replay")}
                </Tooltip>
              }
            >
              <a
                className="btn btn-icon btn-light btn-hover-success btn-sm mr-1"
                onClick={() =>
                  window.open(`/bowling/reserves/${row.ReserveId}/replay`)
                }
              >
                <span className="svg-icon svg-icon-md svg-icon-success">
                  <i className="fas fa-sync-alt text-success"></i>
                </span>
              </a>
            </OverlayTrigger>
            <OverlayTrigger
              overlay={
                <Tooltip id="restaurantInvoices-edit-tooltip">
                  {t("Reserve.RelocationLine")}
                </Tooltip>
              }
            >
              <a
                className="btn btn-icon btn-light btn-hover-warning btn-sm mr-1"
                onClick={() => openRelocationDialog(row.ReserveId)}
              >
                <span className="svg-icon svg-icon-md svg-icon-warning">
                  <i className="fas fa-exchange text-warning"></i>
                </span>
              </a>
            </OverlayTrigger>
            <OverlayTrigger
              overlay={
                <Tooltip id="reserves-edit-tooltip">
                  {t("Common.AddTime")}
                </Tooltip>
              }
            >
              <a
                className="btn btn-icon btn-light btn-hover-primary btn-sm mr-1"
                onClick={() => openAddTimeReserveDialog(row.ReserveId)}
              >
                <span className="svg-icon svg-icon-md svg-icon-primary">
                  <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Timer.svg")} />
                </span>
              </a>
            </OverlayTrigger>
            <OverlayTrigger
              overlay={
                <Tooltip id="reserves-edit-tooltip">
                  {t("Common.Edit") + " " + t("Common.Score")}
                </Tooltip>
              }
            >
              <a
                className="btn btn-icon btn-light btn-hover-danger btn-sm mr-1"
                onClick={() =>
                  window.open(`/bowling/reserves/${row.ReserveId}/editscore`)
                }
              >
                <i className="fas fa-money-check-edit text-danger"></i>
              </a>
            </OverlayTrigger>
            <OverlayTrigger
              overlay={
                <Tooltip id="reserves-edit-tooltip">
                  {t("Common.Checkout")}
                </Tooltip>
              }
            >
              <a
                className="btn btn-icon btn-light btn-hover-success btn-sm mr-1"
                onClick={() => openCashDialog(row.ReserveId)}
              >
                <i className="fas fa-sack-dollar text-success"></i>
              </a>
            </OverlayTrigger>
          </Popover.Content>
        </Popover>
      }
    >
      <Button
        className="btn btn-icon btn-light btn-hover-warning btn-sm mr-1"
        variant="warning"
      >
        <i className="fas fa-ellipsis-v text-warning"></i>
      </Button>
    </OverlayTrigger>
    <OverlayTrigger
      overlay={<Tooltip id="reserves-edit-tooltip">{t("Common.Edit")}</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-hover-primary btn-sm mr-1"
        onClick={() => openEditReservePage(row.ReserveId)}
      >
        <i className="fas fa-pencil text-primary"></i>
      </a>
    </OverlayTrigger>
    <OverlayTrigger
      overlay={<Tooltip id="reserves-edit-tooltip">{t("Common.Done")}</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-hover-success btn-sm mr-1"
        onClick={() => openDoneReserveDialog(row.ReserveId)}
      >
        <i className="fas fa-check text-success"></i>
      </a>
    </OverlayTrigger>
    <OverlayTrigger
      overlay={<Tooltip id="reserves-edit-tooltip">{t("Common.Show")}</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-hover-primary btn-sm mr-1"
        onClick={() => window.open(`/bowling/reserves/${row.ReserveId}/score`)}
      >
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG src={toAbsoluteUrl("/media/svg/icons/Devices/Display2.svg")} />
        </span>
      </a>
    </OverlayTrigger>
    <OverlayTrigger
      overlay={
        <Tooltip id="reserves-delete-tooltip">{t("Common.Delete")}</Tooltip>
      }
    >
      <a
        className="btn btn-icon btn-light btn-hover-danger btn-sm mr-1"
        onClick={() => openDeleteReserveDialog(row.ReserveId)}
      >
        <i className="fas fa-trash-alt text-danger"></i>
      </a>
    </OverlayTrigger>
  </>
);
