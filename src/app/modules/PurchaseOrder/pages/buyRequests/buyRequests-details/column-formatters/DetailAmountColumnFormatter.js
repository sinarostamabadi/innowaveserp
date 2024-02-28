/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../core/_helpers";

export function DetailAmountColumnFormatter(cellContent, row, rowIndex, { t }) {
  const hasSerial = row.Product.HasSerial;
  const amount = row.Amount;
  const serialCount = !!row.BuyRequestSerials
    ? row.BuyRequestSerials.length
    : 0;

  return (
    <>
      <OverlayTrigger
        overlay={
          <Tooltip id="specs-edit-tooltip">
            {hasSerial ? (
              <>
                {t("BuyRequestDetail.Amount") + ": " + amount}
                <br />
                {t("Common.Serials") + ": " + serialCount}
              </>
            ) : (
              t("BuyRequestDetail.Amount") + ": " + amount
            )}
          </Tooltip>
        }
      >
        <span
          className={amount != serialCount && hasSerial ? "text-danger" : ""}
        >
          {amount + (hasSerial ? " (" + serialCount + ")" : "")}
        </span>
      </OverlayTrigger>
    </>
  );
}
