/* eslint-disable no-restricted-imports */
import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import { useDetailsUIContext } from "./DetailsUIContext";
import { useTranslation } from "react-i18next";

export function DetailDeleteDialog() {
  const { t } = useTranslation();

  // Details UI Context
  const detailsUIContext = useDetailsUIContext();
  const detailsUIProps = useMemo(() => {
    return {
      id: detailsUIContext.selectedId,
      personId: detailsUIContext.personId,
      show: detailsUIContext.showDeleteDetailDialog,
      onHide: detailsUIContext.closeDeleteDetailDialog,
      queryParams: detailsUIContext.queryParams,
      setIds: detailsUIContext.setIds,
      findDetail: detailsUIContext.findDetail,
      removeDetail: detailsUIContext.removeDetail,
    };
  }, [detailsUIContext]);

  // Details Redux state
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // if !id we should close modal
  useEffect(() => {
    if (!detailsUIProps.id) {
      detailsUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailsUIProps.id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteDetail = () => {
    detailsUIProps.removeDetail(detailsUIProps.id);
    detailsUIProps.onHide();
  };

  return (
    <Modal
      show={detailsUIProps.show}
      onHide={detailsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("Common.Delete")} {t("BuyRequestDetail.Entity")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && <span>{t("Common.DeleteQuestion")}</span>}
        {isLoading && <span>{t("Common.DeleteLoading")}</span>}
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
