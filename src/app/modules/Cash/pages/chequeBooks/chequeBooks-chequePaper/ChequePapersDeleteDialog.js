/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "src/core/_partials/controls";
import { useChequePapersUIContext } from "./ChequePapersUIContext";
import { useTranslation } from "react-i18next";

export function ChequePaperDeleteDialog() {
  const { t } = useTranslation();

  // ChequePapers UI Context
  const chequePapersUIContext = useChequePapersUIContext();
  const chequePapersUIProps = useMemo(() => {
    return {
      id: chequePapersUIContext.selectedId,
      chequeBookId: chequePapersUIContext.chequeBookId,
      show: chequePapersUIContext.showDeleteChequePaperDialog,
      onHide: chequePapersUIContext.closeDeleteChequePaperDialog,
      queryParams: chequePapersUIContext.queryParams,
      setIds: chequePapersUIContext.setIds,
      findChequePaper: chequePapersUIContext.findChequePaper,
      removeChequePaper: chequePapersUIContext.removeChequePaper,
    };
  }, [chequePapersUIContext]);

  // ChequePapers Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.chequePapers.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!chequePapersUIProps.id) {
      chequePapersUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chequePapersUIProps.id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteChequePaper = () => {
    chequePapersUIProps.removeChequePaper(chequePapersUIProps.id);
    chequePapersUIProps.onHide();
  };

  return (
    <Modal
      show={chequePapersUIProps.show}
      onHide={chequePapersUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("Common.Delete")} {t("ChequePaper.Entity")}
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
            onClick={chequePapersUIProps.onHide}
            className="btn btn-light btn-elevate"
          >
            {t("Common.Cancel")}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteChequePaper}
            className="btn btn-primary btn-elevate"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
