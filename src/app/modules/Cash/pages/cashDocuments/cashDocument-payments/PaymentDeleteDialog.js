/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "src/core/_partials/controls";
import { usePaymentsUIContext } from "./PaymentsUIContext";
import { useTranslation } from "react-i18next";

export function PaymentDeleteDialog() {
  const { t } = useTranslation();

  // Payments UI Context
  const paymentsUIContext = usePaymentsUIContext();
  const paymentsUIProps = useMemo(() => {
    return {
      id: paymentsUIContext.selectedId,
      documentId: paymentsUIContext.documentId,
      show: paymentsUIContext.showDeletePaymentDialog,
      onHide: paymentsUIContext.closeDeletePaymentDialog,
      queryParams: paymentsUIContext.queryParams,
      setIds: paymentsUIContext.setIds,
      findPayment: paymentsUIContext.findPayment,
      removePayment: paymentsUIContext.removePayment,
    };
  }, [paymentsUIContext]);

  // Payments Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.companies.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!paymentsUIProps.id) {
      paymentsUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentsUIProps.id]);

  // looking for loading/dispatch
  useEffect(() => { }, [isLoading, dispatch]);

  const deletePayment = () => {
    paymentsUIProps.removePayment(paymentsUIProps.id)
    paymentsUIProps.onHide();
  };

  return (
    <Modal
      show={paymentsUIProps.show}
      onHide={paymentsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("Common.Delete")} {t("CashDocument.Payment")}
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
            onClick={paymentsUIProps.onHide}
            className="btn btn-light btn-elevate"
          >
            {t("Common.Cancel")}
          </button>
          <> </>
          <button
            type="button"
            onClick={deletePayment}
            className="btn btn-primary btn-elevate"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
