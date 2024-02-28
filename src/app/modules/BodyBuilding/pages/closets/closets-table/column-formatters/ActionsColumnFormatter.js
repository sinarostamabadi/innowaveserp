import { OverlayTrigger, Tooltip } from "react-bootstrap";

export const ActionsColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  {
    openEditClosetPage,
    openDeleteClosetDialog,
    openClosetOpenDialog,
    openClosetFreeDialog,
    t,
  }
) => (
  <>
    <OverlayTrigger
      overlay={<Tooltip id="closets-edit-tooltip">{t("Common.Edit")}</Tooltip>}
    >
      <button
        className="btn btn-icon btn-light btn-hover-primary btn-sm"
        onClick={() => openEditClosetPage(row.BodyBuildingClosetId)}
      >
        <i className="fa fa-pencil text-primary"></i>
      </button>
    </OverlayTrigger>
    <OverlayTrigger
      overlay={
        <Tooltip id="closets-open-tooltip">{t("Common.OpenCloset")}</Tooltip>
      }
    >
      <button
        className="btn btn-icon btn-light btn-hover-success btn-sm mx-1"
        onClick={() => openClosetOpenDialog(row.BodyBuildingClosetId)}
      >
        <i class="fas fa-box-check text-success"></i>
      </button>
    </OverlayTrigger>
    <OverlayTrigger
      overlay={
        <Tooltip id="closets-open-tooltip">{t("Common.FreeCloset")}</Tooltip>
      }
    >
      <button
        className="btn btn-icon btn-light btn-hover-success btn-sm mx-1"
        onClick={() => openClosetFreeDialog(row.BodyBuildingClosetId)}
      >
        <i class="fas fa-box text-success"></i>
      </button>
    </OverlayTrigger>
    <OverlayTrigger
      overlay={
        <Tooltip id="closets-delete-tooltip">{t("Common.Delete")}</Tooltip>
      }
    >
      <button
        className="btn btn-icon btn-light btn-hover-danger btn-sm"
        onClick={() => openDeleteClosetDialog(row.BodyBuildingClosetId)}
      >
        <i className="fas fa-trash-alt text-danger"></i>
      </button>
    </OverlayTrigger>
  </>
);
