import { OverlayTrigger, Tooltip } from "react-bootstrap";

export function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,
  { openEditReservePersonDialog, openDeleteReservePersonDialog, openSerialReservePersonDialog, t }
) {
  return (
    <>
      <OverlayTrigger
        overlay={
          <Tooltip id="spec-delete-tooltip">{t("Common.Delete")}</Tooltip>
        }
      >
        <button
          className="btn btn-icon btn-light btn-hover-danger btn-sm"
          onClick={() => {
            openDeleteReservePersonDialog(row.ReservePersonScoreId);
          }}
        >
          <i className="fas fa-trash-alt text-danger"></i>
        </button>
      </OverlayTrigger>
    </>
  );
}
