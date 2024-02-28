/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import { useRestaurantInvoiceDetailsUIContext } from "./RestaurantInvoiceDetailsUIContext";
import { useTranslation } from "react-i18next";

export function RestaurantInvoiceDetailDeleteDialog() {
  const { t } = useTranslation();

  // Details UI Context
  const detailUIContext = useRestaurantInvoiceDetailsUIContext();
  const detailsUIProps = useMemo(() => {
    return {
      id: detailUIContext.selectedId,
      personId: detailUIContext.personId,
      show: detailUIContext.showDeleteDetailDialog,
      onHide: detailUIContext.closeDeleteDetailDialog,
      queryParams: detailUIContext.queryParams,
      setIds: detailUIContext.setIds,
      findDetail: detailUIContext.findDetail,
      removeDetail: detailUIContext.removeDetail,
    };
  }, [detailUIContext]);

  // if !id we should close modal
  useEffect(() => {
    if (!detailsUIProps.id) {
      detailsUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailsUIProps.id]);

  // looking for loading/dispatch
  useEffect(() => {}, []);

  const deleteDetail = () => {
    console.log("detailsUIProps.id > ", detailsUIProps.id);
    detailsUIProps.removeDetail(detailsUIProps.id);
    detailsUIProps.onHide();
  };

  return (
    <Modal
      show={detailsUIProps.show}
      onHide={detailsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("Common.Delete")} {t("RestaurantMenuItem.Entity")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>{t("Common.DeleteQuestion")}</span>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={detailsUIProps.onHide}
            className="btn btn-light btn-elevate"
          >
            {t("Common.Cancel")}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteDetail}
            className="btn btn-primary btn-elevate"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
