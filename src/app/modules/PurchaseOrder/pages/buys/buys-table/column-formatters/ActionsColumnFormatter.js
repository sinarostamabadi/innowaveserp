import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../core/_helpers";

export const ActionsColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  { openEditBuyPage, openDeleteBuyDialog, openCancelAndReturnDialog, openAttachmentsDialog, openBuyProfit, pay, t }
) => {
  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip id="buys-edit-tooltip">{t("Common.Edit")}</Tooltip>}
      >
        <button
          className="btn btn-icon btn-light btn-hover-primary btn-sm mr-2"
          onClick={() => openEditBuyPage(row.BuyId)}
        >
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
            />
          </span>
        </button>
      </OverlayTrigger>
      {!!row.IsTemp && (
        <OverlayTrigger
          overlay={
            <Tooltip id="buys-delete-tooltip">{t("Common.Delete")}</Tooltip>
          }
        >
          <button
            className="btn btn-icon btn-light btn-hover-danger btn-sm mr-2"
            onClick={() => openDeleteBuyDialog(row.BuyId)}
          >
            <span className="svg-icon svg-icon-md svg-icon-danger">
              <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")} />
            </span>
          </button>
        </OverlayTrigger>
      )}
      <OverlayTrigger
        overlay={<Tooltip id="buys-delete-tooltip">برگشت از خرید</Tooltip>}
      >
        <button
          className="btn btn-icon btn-light btn-hover-danger btn-sm mr-2"
          onClick={() => openCancelAndReturnDialog(row.BuyId)}
        >
          <span className="svg-icon svg-icon-md svg-icon-danger">
            <SVG src={toAbsoluteUrl("/media/svg/icons/Text/Undo.svg")} />
          </span>
        </button>
      </OverlayTrigger>
      <OverlayTrigger
        overlay={<Tooltip id="buys-delete-tooltip">سود خرید</Tooltip>}
      >
        <button
          className="btn btn-icon btn-light btn-hover-success btn-sm mr-2"
          onClick={() => openBuyProfit(row.BuyId)}
        >
          <span className="svg-icon svg-icon-md svg-icon-success">
            <i className="fas fa-sack-dollar text-success"></i>
          </span>
        </button>
      </OverlayTrigger>
      <OverlayTrigger
        overlay={<Tooltip id="buys-delete-tooltip">{t("Common.Attachments")}</Tooltip>}
      >
        <button
          className="btn btn-icon btn-light btn-hover-success btn-sm mr-2"
          onClick={() => openAttachmentsDialog(row.BuyId)}
        >
          <span className="svg-icon svg-icon-md svg-icon-success">
            <i className="fas fa-paperclip text-success"></i>
          </span>
        </button>
      </OverlayTrigger>
      <OverlayTrigger
        overlay={
          <Tooltip id="buys-edit-tooltip">
            {t("Common.Pay")}
          </Tooltip>
        }
      >
        <button
          className="btn btn-icon btn-light btn-hover-primary btn-sm"
          onClick={() => pay(row.BuyId)}
        >
          <span className="svg-icon svg-icon-md svg-icon-success">
            <i className="fas fa-cash-register text-info"></i>
          </span>
        </button>
      </OverlayTrigger>
      {/* <OverlayTrigger
      overlay={<Tooltip id="buys-delete-tooltip">پرداخت</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-hover-danger btn-sm mr-2"
        onClick={() => openDeleteBuyDialog(row.BuyId)}
      >
        <span className="svg-icon svg-icon-md svg-icon-danger">
          <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Dollar.svg")} />
        </span>
      </a>
    </OverlayTrigger>
    <OverlayTrigger
      overlay={<Tooltip id="buys-delete-tooltip">صدور سند</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-hover-danger btn-sm mr-2"
        onClick={() => openDeleteBuyDialog(row.BuyId)}
      >
        <i className="fas fa-trash-alt text-danger"></i>
      </a>
    </OverlayTrigger>
    <OverlayTrigger
      overlay={<Tooltip id="buys-delete-tooltip">بستن</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-hover-danger btn-sm mr-2"
        onClick={() => openDeleteBuyDialog(row.BuyId)}
      >
        <i className="fas fa-trash-alt text-danger"></i>
      </a>
    </OverlayTrigger>
    <OverlayTrigger
      overlay={<Tooltip id="buys-delete-tooltip">لغو</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-hover-danger btn-sm mr-2"
        onClick={() => openDeleteBuyDialog(row.BuyId)}
      >
        <i className="fas fa-trash-alt text-danger"></i>
      </a>
    </OverlayTrigger>
    <OverlayTrigger
      overlay={<Tooltip id="buys-delete-tooltip">خروج از حالت موقت</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-hover-danger btn-sm mr-2"
        onClick={() => openDeleteBuyDialog(row.BuyId)}
      >
        <i className="fas fa-trash-alt text-danger"></i>
      </a>
    </OverlayTrigger> */}

    </>
  )};
