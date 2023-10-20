/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "src/core/_partials/controls";
import { usePromissoryNotesUIContext } from "./PromissoryNotesUIContext";
import { useTranslation } from "react-i18next";

export function PromissoryNoteDeleteDialog() {
  const { t } = useTranslation();

  // PromissoryNotes UI Context
  const promissoryNotesUIContext = usePromissoryNotesUIContext();
  const promissoryNotesUIProps = useMemo(() => {
    return {
      id: promissoryNotesUIContext.selectedId,
      documentId: promissoryNotesUIContext.documentId,
      show: promissoryNotesUIContext.showDeletePromissoryNoteDialog,
      onHide: promissoryNotesUIContext.closeDeletePromissoryNoteDialog,
      queryParams: promissoryNotesUIContext.queryParams,
      setIds: promissoryNotesUIContext.setIds,
      findPromissoryNote: promissoryNotesUIContext.findPromissoryNote,
      removePromissoryNote: promissoryNotesUIContext.removePromissoryNote,
    };
  }, [promissoryNotesUIContext]);

  // PromissoryNotes Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.companies.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!promissoryNotesUIProps.id) {
      promissoryNotesUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promissoryNotesUIProps.id]);

  // looking for loading/dispatch
  useEffect(() => { }, [isLoading, dispatch]);

  const deletePromissoryNote = () => {
    promissoryNotesUIProps.removePromissoryNote(promissoryNotesUIProps.id)
    promissoryNotesUIProps.onHide();
  };

  return (
    <Modal
      show={promissoryNotesUIProps.show}
      onHide={promissoryNotesUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("Common.Delete")} {t("CashDocument.PromissoryNote")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>{t("Common.DeleteQuestion")}</span>
        )}
        {isLoading && <span>{t("Common.DeleteLoading")}</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={promissoryNotesUIProps.onHide}
            className="btn btn-light btn-elevate"
          >
            {t("Common.Cancel")}
          </button>
          <> </>
          <button
            type="button"
            onClick={deletePromissoryNote}
            className="btn btn-primary btn-elevate"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
