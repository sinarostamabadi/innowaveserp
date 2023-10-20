/* eslint-disable no-restricted-imports */
import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import { useProductUnitsUIContext } from "./ProductUnitsUIContext";
import { useTranslation } from "react-i18next";

export function ProductUnitDeleteDialog() {
  const { t } = useTranslation();

  // ProductUnits UI Context
  const productUnitsUIContext = useProductUnitsUIContext();
  const productUnitsUIProps = useMemo(() => {
    return {
      id: productUnitsUIContext.selectedId,
      show: productUnitsUIContext.showDeleteProductUnitDialog,
      onHide: productUnitsUIContext.closeDeleteProductUnitDialog,
      queryParams: productUnitsUIContext.queryParams,
      setIds: productUnitsUIContext.setIds,
      findProductUnit: productUnitsUIContext.findProductUnit,
      removeProductUnit: productUnitsUIContext.removeProductUnit,
    };
  }, [productUnitsUIContext]);

  // ProductUnits Redux state
  const dispatch = useDispatch();
  const [ isLoading, setIsLoading ] = useState(false);

  // if !id we should close modal
  useEffect(() => {
    if (!productUnitsUIProps.id) {
      productUnitsUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productUnitsUIProps.id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteProductUnit = () => {
    productUnitsUIProps.removeProductUnit(productUnitsUIProps.id)
    productUnitsUIProps.onHide();
  };

  return (
    <Modal
      show={productUnitsUIProps.show}
      onHide={productUnitsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("Common.Delete")} {t("ProductUnit.Entity")}
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
            onClick={productUnitsUIProps.onHide}
            className="btn btn-light btn-elevate"
          >
            {t("Common.Cancel")}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteProductUnit}
            className="btn btn-primary btn-elevate"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
