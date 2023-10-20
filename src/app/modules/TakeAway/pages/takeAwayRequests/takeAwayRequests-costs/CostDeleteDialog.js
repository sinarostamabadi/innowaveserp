/* eslint-disable no-restricted-imports */
import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import { useCostsUIContext } from "./CostsUIContext";
import { useTranslation } from "react-i18next";

export function CostDeleteDialog() {
  const { t } = useTranslation();

  // Costs UI Context
  const costsUIContext = useCostsUIContext();
  const costsUIProps = useMemo(() => {
    return {
      id: costsUIContext.selectedId,
      personId: costsUIContext.personId,
      show: costsUIContext.showDeleteCostDialog,
      onHide: costsUIContext.closeDeleteCostDialog,
      queryParams: costsUIContext.queryParams,
      setIds: costsUIContext.setIds,
      findCost: costsUIContext.findCost,
      removeCost: costsUIContext.removeCost,
    };
  }, [costsUIContext]);

  // Costs Redux state
  const dispatch = useDispatch();
  const [ isLoading, setIsLoading ] = useState(false);

  // if !id we should close modal
  useEffect(() => {
    if (!costsUIProps.id) {
      costsUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [costsUIProps.id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteCost = () => {
    costsUIProps.removeCost(costsUIProps.id)
    costsUIProps.onHide();
  };

  return (
    <Modal
      show={costsUIProps.show}
      onHide={costsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("Common.Delete")} {t("TakeAwayRequestDtl.Entity")}
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
            onClick={costsUIProps.onHide}
            className="btn btn-light btn-elevate"
          >
            {t("Common.Cancel")}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteCost}
            className="btn btn-primary btn-elevate"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
