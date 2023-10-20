/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "src/core/_partials/controls";
import { useCreditsUIContext } from "./CreditsUIContext";
import { useTranslation } from "react-i18next";

export function CreditDeleteDialog() {
  const { t } = useTranslation();

  // Credits UI Context
  const creditsUIContext = useCreditsUIContext();
  const creditsUIProps = useMemo(() => {
    return {
      id: creditsUIContext.selectedId,
      documentId: creditsUIContext.documentId,
      show: creditsUIContext.showDeleteCreditDialog,
      onHide: creditsUIContext.closeDeleteCreditDialog,
      queryParams: creditsUIContext.queryParams,
      setIds: creditsUIContext.setIds,
      findCredit: creditsUIContext.findCredit,
      removeCredit: creditsUIContext.removeCredit,
    };
  }, [creditsUIContext]);

  // Credits Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.companies.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!creditsUIProps.id) {
      creditsUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creditsUIProps.id]);

  // looking for loading/dispatch
  useEffect(() => { }, [isLoading, dispatch]);

  const deleteCredit = () => {
    creditsUIProps.removeCredit(creditsUIProps.id)
    creditsUIProps.onHide();
  };

  return (
    <Modal
      show={creditsUIProps.show}
      onHide={creditsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("Common.Delete")} {t("CashDocument.Credit")}
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
            onClick={creditsUIProps.onHide}
            className="btn btn-light btn-elevate"
          >
            {t("Common.Cancel")}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteCredit}
            className="btn btn-primary btn-elevate"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
