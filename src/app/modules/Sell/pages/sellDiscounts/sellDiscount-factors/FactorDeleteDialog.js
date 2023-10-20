/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import { useFactorsUIContext } from "./FactorsUIContext";
import { useTranslation } from "react-i18next";

export function FactorDeleteDialog() {
  const { t } = useTranslation();

  // Factors UI Context
  const factorsUIContext = useFactorsUIContext();
  const factorsUIProps = useMemo(() => {
    return {
      id: factorsUIContext.selectedId,
      sellDiscountId: factorsUIContext.sellDiscountId,
      show: factorsUIContext.showDeleteFactorDialog,
      onHide: factorsUIContext.closeDeleteFactorDialog,
      findFactor: factorsUIContext.findFactor,
      removeFactor: factorsUIContext.removeFactor,
    };
  }, [factorsUIContext]);

  // if !id we should close modal
  useEffect(() => {
    if (!factorsUIProps.id) {
      factorsUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [factorsUIProps.id]);

  const deleteFactor = () => {
    factorsUIProps.removeFactor(factorsUIProps.id)
    factorsUIProps.onHide();
  };

  return (
    <Modal
      show={factorsUIProps.show}
      onHide={factorsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("Common.Delete")} {t("Factor.Entity")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <span>{t("Common.DeleteQuestion")}</span>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={factorsUIProps.onHide}
            className="btn btn-light btn-elevate"
          >
            {t("Common.Cancel")}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteFactor}
            className="btn btn-primary btn-elevate"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
